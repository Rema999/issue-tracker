# Issue Tracker

A carefully structured issue tracker built for a senior frontend home assignment. Stack: **Next.js 16 (App Router)**, **Relay**, **Supabase (pg\_graphql)**, **TypeScript (strict)**, and **Tailwind CSS**.

---

## Features

- **Issue list** with multi-select filters (status, priority, labels) and cursor-based pagination
- **Real-time updates** via Supabase Realtime — status, label, and other changes appear across tabs without a page refresh
- **Issue detail** with inline editing of title, description, status, priority, assignee, and labels — all changes reflect immediately (local-state optimistic UI)
- **Comment thread** with cursor-based pagination and live append after posting
- **Co-located Relay fragments** — every section of the detail page owns its data requirements; no monolithic top-level query

---

## Setup

### Prerequisites

- Node.js 20+
- A Supabase project with `pg_graphql` enabled (**Dashboard → Database → Extensions → pg_graphql**)

### 1. Clone and install

```bash
git clone <repo-url>
cd issue-tracker
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
# Edit .env.local and fill in your Supabase project URL and anon key
```

### 3. Create the database schema

Run the following SQL in **Supabase Dashboard → SQL Editor**:

```sql
create table users (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  avatar_url  text
);

create table issues (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  status      text not null default 'OPEN',
  priority    text,
  assignee_id uuid references users(id) on delete set null,
  created_at  timestamptz not null default now()
);

create table comments (
  id         uuid primary key default gen_random_uuid(),
  issue_id   uuid not null references issues(id) on delete cascade,
  body       text not null,
  author_id  uuid references users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table labels (
  id    uuid primary key default gen_random_uuid(),
  name  text not null,
  color text not null default '#94a3b8'
);

create table issue_labels (
  issue_id uuid not null references issues(id) on delete cascade,
  label_id uuid not null references labels(id) on delete cascade,
  primary key (issue_id, label_id)
);
```

Enable Row Level Security with permissive policies for the demo:

```sql
alter table users        enable row level security;
alter table issues       enable row level security;
alter table comments     enable row level security;
alter table labels       enable row level security;
alter table issue_labels enable row level security;

create policy "allow all" on users        for all using (true);
create policy "allow all" on issues       for all using (true);
create policy "allow all" on comments     for all using (true);
create policy "allow all" on labels       for all using (true);
create policy "allow all" on issue_labels for all using (true);
```

### 4. Enable Supabase Realtime

Supabase Realtime only delivers change events for tables explicitly added to the `supabase_realtime` publication.

Run in **SQL Editor**:

```sql
alter publication supabase_realtime add table issues;
alter publication supabase_realtime add table issue_labels;
alter publication supabase_realtime add table comments;
```

**Why `issues` and `issue_labels` specifically:**
- `issues` — status, priority, title, description, and assignee changes all happen here
- `issue_labels` — adding or removing a label is an INSERT/DELETE on this join table, not a change to `issues`, so it requires its own subscription entry

Without this step the Supabase JS client's `channel.on('postgres_changes', ...)` will subscribe without error but silently receive no events.

### 5. Seed test data (optional)

Run `scripts/seed.sql` in Supabase SQL Editor to populate users, issues, labels, and comments.

### 6. Fetch the GraphQL schema (optional)

A `schema.graphql` is already committed — generated from the Supabase project used during development. It works as-is if your tables match the SQL in step 3.

To regenerate from your own Supabase project:

```bash
npm run fetch-schema
```

This runs `scripts/fetch-schema.js`, which fetches the pg\_graphql introspection result via the GraphQL endpoint and writes the SDL directly to `schema.graphql` using `buildClientSchema` + `printSchema` from the `graphql` package. No extra tools required — only the two env variables from `.env.local`.

### 7. Compile Relay artifacts

```bash
npm run relay
```

This generates all `__generated__/*.graphql.ts` files that the TypeScript compiler and React components need.

### 8. Run the development server

Run both in parallel (two terminals):

```bash
# Terminal 1 — Relay compiler in watch mode
npm run relay:watch

# Terminal 2 — Next.js dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Relay + pg\_graphql: Problems and Solutions

This is the most nuanced part of the project. Below is a complete account of every non-obvious problem encountered and how it was solved.

### Problem 1 — `nodeId` instead of `id` as the global identifier

Relay expects a field named `id: ID!` on every cacheable type. pg\_graphql implements the [Relay Global Object Identification spec](https://relay.dev/graphql/objectidentification.htm) but uses `nodeId` instead of `id`.

**Solution:** `nodeInterfaceIdField` in the Relay compiler config:

```js
// relay.config.js
module.exports = {
  schemaConfig: {
    nodeInterfaceIdField: 'nodeId',
    nodeInterfaceIdVariableName: 'nodeId',
  },
}
```

### Problem 2 — pg\_graphql naming conventions (`inflect_names = false`)

With `inflect_names = false` (the Supabase default), pg\_graphql generates names that differ from typical hand-written schemas:

| Convention | pg\_graphql | Typical |
|---|---|---|
| Query field | `issuesCollection` | `issues` |
| Relation field | `issue_labelsCollection` | `issueLabels` |
| Update mutation | `updateissuesCollection` | `updateIssue` |
| Insert mutation | `insertIntoissue_labelsCollection` | `addLabel` |

**Solution:** Write all operations using pg\_graphql's exact conventions. The committed `schema.graphql` reflects these so the Relay compiler validates against them correctly.

### Problem 3 — Turbopack does not support `babel-plugin-relay`

Relay requires a compile-time transform that replaces `` graphql`...` `` tags with `require()` calls to pre-compiled artifacts. The official transform is `babel-plugin-relay`, which Turbopack (the default for `next dev` in Next.js 15+) does not support.

**Solution:** Keep Turbopack and import pre-compiled artifacts directly:

```ts
// Instead of relying on the babel transform:
import IssueListItemIssueNode from '@/__generated__/IssueListItem_issue.graphql'
const data = useFragment(IssueListItemIssueNode, issueRef)
```

Fragment definitions live in `graphql/*.ts` files (relay-compiler source only, never imported at runtime). Components import from `__generated__/` directly. This is semantically identical to what `babel-plugin-relay` would produce and works with any bundler.

### Problem 4 — pg\_graphql does not resolve nested fragment spreads

Relay generates query text where fragments spread other fragments (e.g. `IssueList_query` spreads `IssueListItem_issue`). pg\_graphql only resolves fragment spreads one level deep, causing `no fragment named IssueListItem_issue on type issues` errors at runtime.

**Solution:** Pre-process the query text in the network layer before sending to Supabase. Every named fragment spread is replaced with an inline fragment, and named fragment definitions are stripped:

```ts
// lib/relay/network.ts
function inlineAllFragments(queryText: string): string {
  const doc = parse(queryText)
  const frags = buildFragmentMap(doc)
  const flatDefs = doc.definitions
    .filter(d => d.kind !== 'FragmentDefinition')
    .map(def => inlineSelectionsDeep(def, frags))
  return print({ kind: 'Document', definitions: flatDefs })
}
```

### Problem 5 — `__typename` casing mismatch

pg\_graphql with `inflect_names = false` returns lowercase `__typename` values (e.g. `"issues"`) while Relay's store expects PascalCase (`"Issues"`) matching the schema type names.

**Solution:** Normalize all `__typename` values in the network layer after receiving the response:

```ts
const TYPENAME_MAP: Record<string, string> = {
  issues: 'Issues', users: 'Users', comments: 'Comments',
  labels: 'Labels', issue_labels: 'IssueLabels',
}

function normalizeTypenames(data: unknown): unknown {
  // recursively walk JSON, rewrite __typename values
}
```

### Problem 6 — Typed inline fragments inside `node()` queries

When type conditions are kept in inline fragments sent to pg\_graphql (e.g. `... on Issues { ... }`), pg\_graphql fails because its runtime uses lowercase type names (`issues`, not `Issues`). However, completely removing type conditions breaks `node(nodeId: ...)` refetch queries, because pg\_graphql needs the type condition to know which table to resolve sub-fields from.

**Solution:** Keep type conditions but lowercase them before sending:

```ts
function lowerTypeCondition(typeCondition) {
  if (!typeCondition) return undefined
  const name = typeCondition.name.value
  if (name === 'Query' || name === 'query') return undefined // root type: no condition needed
  return { ...typeCondition, name: { value: name.toLowerCase() } }
}
```

This makes `... on Issues { commentsCollection }` become `... on issues { commentsCollection }`, which pg\_graphql resolves correctly. `normalizeTypenames` handles the reverse direction in responses.

### Problem 7 — Relay pagination refetch via `node()` fails with sub-relations

Relay's `@refetchable` on a non-root fragment (e.g. `on Issues`) generates pagination queries that use `node(nodeId: ...)` to re-fetch the parent record and then load the next page. pg\_graphql's `node()` implementation does not correctly resolve sub-relations (`commentsCollection`) inside typed inline fragments, returning `"Invalid input for NonNull type"`.

**Solution:** Place the comments pagination fragment on `Query` instead of `Issues`, following the [pg\_graphql + Relay docs](https://supabase.github.io/pg_graphql/usage_with_relay/):

```graphql
# Works ✓ — generates a root-level refetch query, no node() lookup
fragment CommentThread_query on Query
@argumentDefinitions(issueId: { type: "UUID!" }, ...)
@refetchable(queryName: "CommentThreadPaginationQuery") {
  commentsCollection(filter: { issue_id: { eq: $issueId } }, ...) @connection(key: "...") {
    ...
  }
}
```

### Problem 8 — Mutations: `nodeId` cannot be used as a filter value

Relay's `nodeId` is a **computed** field (a base64-encoded JSON string that pg\_graphql derives at query time from the primary key). It is exposed in `IssuesFilter` as `nodeId: IDFilter`, but in practice pg\_graphql cannot use it to match rows in an UPDATE or DELETE — the filter returns `records: []` and nothing is written to the database. Critically, pg\_graphql returns no error, so the mutation appears to succeed.

**Solution:** Always filter mutations by the actual primary key column:

```graphql
# Wrong — nodeId filter silently matches 0 rows
mutation UpdateStatus($nodeId: ID!, $status: String!) {
  updateissuesCollection(filter: { nodeId: { eq: $nodeId } }, set: { status: $status }) { ... }
}

# Correct — id is the real PK column
mutation UpdateStatus($id: UUID!, $status: String!) {
  updateissuesCollection(filter: { id: { eq: $id } }, set: { status: $status }) { ... }
}
```

All mutations in this project use `id: UUID!` as the filter variable and pass `issue.id` from the fragment.

### Problem 9 — Relay optimistic updates get rolled back

The standard Relay pattern for immediate UI feedback is `optimisticUpdater`: mutate the store immediately and let Relay roll it back if the server returns an error. However, when the mutation response does not include a recognizable record (e.g. due to `__typename` not matching, or `records: []`), Relay rolls back the optimistic patch — causing a visible flicker even on successful mutations.

**Solution:** Local component state for immediate feedback, with revert on `onError`:

```ts
const [localStatus, setLocalStatus] = useState(issue.status ?? 'OPEN')

const handleStatusChange = (status: string) => {
  const prev = localStatus
  setLocalStatus(status)              // ← immediate, no Relay involvement
  commitStatus({
    variables: { id: issue.id, status },
    onError() { setLocalStatus(prev) }, // ← revert only on confirmed error
  })
}
```

A `useEffect` syncs local state back from the Relay fragment whenever the store is updated externally (e.g. after a Realtime-triggered refetch from another tab).

---

## Architecture Decisions

### Client-only Relay environment

The Relay environment lives entirely on the client. Server components (page files) are thin wrappers that render client component trees inside `<Suspense>`. This avoids the complexity of serializing Relay store records across the RSC boundary.

**Alternative considered:** Server preloading — run `fetchQuery` in a server component, serialize the store as JSON, hydrate on the client before first render. This eliminates the loading skeleton on initial page load and is documented as a future improvement.

### Fragment co-location

Each section of the issue detail page declares its own Relay fragment:

- `IssueHeader_issue` — title, status, priority
- `IssueDescription_issue` — description
- `IssueSidebar_issue` — assignee, labels
- `CommentThread_query` — paginated comments (on Query, see Problem 7)

The top-level `IssueDetailContent_issue` fragment spreads the first three. Each component is self-contained: move it to another page and its data requirements come with it. No prop drilling of raw data.

### Real-time synchronization

**List page:** A single Supabase Realtime channel subscribed to `issues` and `issue_labels` triggers a Relay `refetch` of the connection on any change. The subscription is created once on mount; `useRef` avoids the stale-closure problem that would occur if the handler directly captured `refetch` or `filters` from the render closure.

**Detail page:** A Supabase Realtime channel subscribed to the specific issue row increments a `fetchKey` state variable, causing `useLazyLoadQuery` to re-fetch in the background (`store-and-network` keeps current data visible during the request). A `useEffect` in each detail component syncs local state from the updated fragment data when the fetch completes.

### Cursor-based pagination

The issue list uses `usePaginationFragment` with `@connection` and `@refetchable` on a `Query`-level fragment. Comment pagination uses the same pattern, anchored at `Query` (not `Issues`) to avoid the `node()` refetch limitation documented in Problem 7.

---

## Trade-offs and What I Would Do With More Time

### Authentication

No auth layer — all queries use the Supabase anon key with permissive RLS. In production: add Supabase Auth, pass the user JWT in `Authorization`, tighten RLS to user-scoped policies.

### Server-side rendering of initial data

The first meaningful paint requires a round trip from the browser. With the RSC preloading pattern (server runs `fetchQuery`, client hydrates from serialized store records) the initial HTML would already contain data.

### Label filtering at the database level

Label filtering is applied client-side after fetching all issues. The correct approach is a pg\_graphql relationship filter:

```graphql
filter: { issue_labelsCollection: { some: { label_id: { in: $labelIds } } } }
```

The exact filter syntax for collection relationships varies by pg\_graphql version. Client-side filtering was chosen to avoid a runtime surprise; the correct approach is documented here.

### Comment updates from other users

The Realtime subscription currently does not include the `comments` table. New comments from other users only appear after a page refresh. Adding `alter publication supabase_realtime add table comments` and a subscription in `CommentThread` would close this gap.

### `nodeId` computation from raw UUID

Supabase Realtime payloads contain the UUID but not the Relay `nodeId`. The `nodeId` can be computed deterministically:

```ts
// pg_graphql encodes nodeId as base64(JSON.stringify(["public", "TableName", { id: uuid }]))
const nodeId = btoa(JSON.stringify(['public', 'Issues', { id: uuid }]))
```

This would enable targeted O(1) Relay store patches on Realtime events rather than a full refetch.

### Zod for filter validation

`zod` is in `package.json` (from the original requirements spec) but is not currently used. The intended use was to validate filter values at the UI boundary before they become GraphQL variables. With more time, `IssueFilters.tsx` would parse the filter state through a Zod schema before passing it to `usePaginationFragment`, making invalid filter combinations impossible to propagate.

### `babel-plugin-relay` in devDependencies

`babel-plugin-relay` is listed in `devDependencies` because it was the originally intended Relay transform. It is not active — see Problem 3 above for why it was replaced by direct artifact imports. It can be removed safely; it is kept as documentation of the considered approach.

### Testing

No tests were written. Ideal test pyramid:
- Unit tests for pure helpers (`inlineAllFragments`, `normalizeTypenames`, filter builders)
- Relay `MockEnvironment` tests for components (avoids network in tests)
- Playwright E2E for the critical paths (list → detail → edit → comment)

---

## Project Structure

```
issue-tracker/
├── relay.config.js             # Relay compiler config (nodeInterfaceIdField, nodeInterfaceIdVariableName)
├── schema.graphql              # pg_graphql schema (committed; regenerate with npm run fetch-schema)
├── scripts/
│   ├── fetch-schema.js         # Introspection → schema.graphql
│   └── seed.sql                # Test data
├── lib/
│   ├── relay/
│   │   ├── network.ts          # fetchGraphQL → inlineAllFragments → normalizeTypenames
│   │   └── environment.ts      # Relay Environment singleton
│   └── supabase.ts             # Supabase JS client (for Realtime subscriptions)
├── graphql/                    # relay-compiler source (never imported at runtime)
│   ├── IssueList.ts            # IssueListQuery, IssueList_query, IssueListStatusMutation
│   ├── IssueDetail.ts          # IssueDetailQuery, IssueDetailContent_issue
│   ├── IssueHeader.ts          # IssueHeader_issue, Title/Priority/StatusMutation
│   ├── IssueDescription.ts     # IssueDescription_issue, IssueDescriptionMutation
│   ├── IssueSidebar.ts         # IssueSidebar_issue, Assignee/Label mutations, Users/LabelsQuery
│   └── CommentThread.ts        # CommentThread_query (on Query), CommentThread_comment
├── components/
│   ├── providers/
│   │   ├── RelayProvider.tsx
│   │   └── ToastProvider.tsx
│   ├── issues/
│   │   ├── IssueList.tsx       # Realtime subscription, pagination, filter
│   │   ├── IssueListItem.tsx   # Local status state + fragment sync
│   │   ├── IssueFilters.tsx
│   │   ├── IssueDetail.tsx     # Realtime subscription (fetchKey), Suspense boundary
│   │   ├── IssueHeader.tsx     # Local state for title/status/priority + fragment sync
│   │   ├── IssueDescription.tsx# Local state for description + fragment sync
│   │   ├── IssueSidebar.tsx    # Local state for assignee/labels + fragment sync
│   │   ├── CommentThread.tsx   # usePaginationFragment, local comment append
│   │   └── CommentForm.tsx     # insertIntocommentsCollection mutation
│   └── ui/
│       ├── StatusBadge.tsx
│       ├── PriorityBadge.tsx
│       ├── Avatar.tsx
│       └── Skeleton.tsx
├── hooks/
│   └── useToast.ts
├── app/
│   ├── layout.tsx
│   ├── page.tsx                # redirect → /issues
│   └── issues/
│       ├── page.tsx            # Issue list page
│       └── [id]/page.tsx       # Issue detail page
└── __generated__/              # Relay compiler output (do not edit manually)
```
