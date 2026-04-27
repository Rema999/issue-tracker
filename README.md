# Issue Tracker

A carefully structured frontend home assignment built with Next.js App Router, Relay, and Supabase's `pg_graphql` extension. The project demonstrates fragment co-location, cursor-based pagination, real-time list updates, and the compatibility work required to run Relay against a Supabase GraphQL backend.

**Live demo:** https://issue-tracker-sigma-one.vercel.app/issues  
**Repository:** https://github.com/Rema999/issue-tracker.git

---

## Implemented Requirements

| Requirement | Status |
|---|---|
| Issue list | ✓ |
| Filter by status (multi-select) | ✓ |
| Filter by priority (multi-select) | ✓ |
| Filter by label (multi-select) | ✓ client-side |
| Cursor-based pagination for issues | ✓ `usePaginationFragment` + Load more |
| Issue detail page | ✓ |
| Inline edit: title | ✓ click-to-edit, Enter/Esc |
| Inline edit: description | ✓ click-to-edit, ⌘↵ to save |
| Inline edit: status | ✓ dropdown, immediate feedback |
| Inline edit: priority | ✓ dropdown, immediate feedback |
| Inline edit: assignee | ✓ dropdown |
| Inline edit: labels | ✓ multi-toggle dropdown |
| Optimistic UI with rollback | ✓ local state + `onError` revert |
| Comments with cursor-based pagination | ✓ `usePaginationFragment`, oldest-first + load earlier |
| Real-time issue list updates | ✓ Supabase Realtime subscription |
| Relay fragment co-location | ✓ per-section fragments on detail page |

> **Label filter note:** label filtering runs client-side. All issues are fetched; the label filter is applied in JS. See Trade-offs for why and what the server-side approach looks like.

---

## Tech Stack

| | |
|---|---|
| Framework | Next.js 16.2.4, App Router |
| Data layer | Relay 20.1.1 (`react-relay`, `relay-runtime`, `relay-compiler`) |
| Backend | Supabase — `pg_graphql` for GraphQL, Supabase Realtime for live updates |
| Language | TypeScript 5, strict mode |
| Styling | Tailwind CSS v4 |
| Zod | Installed per spec; intended for filter input validation (not yet wired up — see Trade-offs) |

---

## Project Structure

```
issue-tracker/
├── relay.config.js             # nodeInterfaceIdField: 'nodeId', nodeInterfaceIdVariableName: 'nodeId'
├── schema.graphql              # Committed pg_graphql SDL; regenerate with npm run fetch-schema
├── graphql/                    # Relay compiler source — never imported at runtime
│   ├── IssueList.ts            # IssueListQuery, IssueList_query fragment, IssueListStatusMutation
│   ├── IssueDetail.ts          # IssueDetailQuery, IssueDetailContent_issue fragment
│   ├── IssueHeader.ts          # IssueHeader_issue, Title / Priority / Status mutations
│   ├── IssueDescription.ts     # IssueDescription_issue, IssueDescriptionMutation
│   ├── IssueSidebar.ts         # IssueSidebar_issue, Assignee / Label mutations, user/label queries
│   ├── CommentThread.ts        # CommentThread_query (on Query), CommentThread_comment
│   ├── CommentForm.ts          # CommentFormMutation
│   └── IssueListItem.ts        # IssueListItem_issue fragment
├── lib/
│   ├── relay/
│   │   ├── network.ts          # fetchGraphQL + inlineAllFragments + normalizeTypenames
│   │   └── environment.ts      # Relay Environment singleton (client) / fresh instance (server)
│   └── supabase.ts             # Supabase JS client (Realtime only; GraphQL goes through Relay)
├── components/
│   ├── providers/
│   │   ├── RelayProvider.tsx
│   │   └── ToastProvider.tsx
│   ├── issues/
│   │   ├── IssueList.tsx       # Root query, Realtime subscription, pagination, client-side label filter
│   │   ├── IssueListItem.tsx   # Row component; local status state for immediate feedback
│   │   ├── IssueFilters.tsx    # Status / priority / label dropdowns (HTML <details>, no JS state)
│   │   ├── IssueDetail.tsx     # Suspense boundary, Realtime subscription (fetchKey strategy)
│   │   ├── IssueHeader.tsx     # Title / status / priority editors; local state + fragment sync
│   │   ├── IssueDescription.tsx# Description editor; local state + fragment sync
│   │   ├── IssueSidebar.tsx    # Assignee / labels editors; local state + fragment sync
│   │   ├── CommentThread.tsx   # Paginated comments + local-append after post
│   │   └── CommentForm.tsx     # Comment mutation
│   └── ui/                     # StatusBadge, PriorityBadge, Avatar, Skeleton
├── hooks/
│   └── useToast.ts
├── scripts/
│   ├── fetch-schema.js         # Introspection → schema.graphql (buildClientSchema + printSchema)
│   └── seed.sql                # Test data
├── app/
│   ├── layout.tsx              # RelayProvider + ToastProvider + nav shell
│   ├── page.tsx                # Redirect → /issues
│   └── issues/
│       ├── page.tsx            # Issue list page (force-dynamic)
│       └── [id]/page.tsx       # Issue detail page
└── __generated__/              # Relay compiler output — do not edit manually
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- A Supabase project with `pg_graphql` enabled (**Dashboard → Database → Extensions → pg_graphql**)

### 1. Clone and install

```bash
git clone <repo-url>
cd issue-tracker
npm install
```

### 2. Environment variables

Copy the example and fill in your values:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The GraphQL endpoint (`/graphql/v1`) is derived from `NEXT_PUBLIC_SUPABASE_URL` at runtime — no separate `GRAPHQL_URL` variable is needed.

### 3. Supabase: create tables

Run in **Supabase Dashboard → SQL Editor**:

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

Enable RLS with permissive policies for the demo:

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

### 4. Supabase: enable Realtime

Supabase Realtime only fires for tables explicitly added to the `supabase_realtime` publication. Run:

```sql
alter publication supabase_realtime add table issues;
alter publication supabase_realtime add table issue_labels;
```

**Why both tables:**
- `issues` — all field changes (status, priority, title, description, assignee) land here.
- `issue_labels` — adding or removing a label is an INSERT/DELETE on this join table, not a change to `issues`. Without this entry, label changes produce no Realtime event.

Without this step, `channel.on('postgres_changes', ...)` subscribes silently but delivers nothing.

### 5. Seed test data (optional)

Run `scripts/seed.sql` in the Supabase SQL Editor to populate users, issues, labels, and sample comments.

### 6. Compile Relay artifacts

```bash
npm run relay
```

Generates `__generated__/*.graphql.ts`. Must be re-run after changing any `graphql/` definition.

### 7. Start the dev server

```bash
# Terminal 1 — Relay compiler (watches graphql/ for changes)
npm run relay:watch

# Terminal 2 — Next.js
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

### Refresh the GraphQL schema (optional)

A `schema.graphql` is already committed — generated from the Supabase project used during development. It works as-is if your tables match step 3.

To regenerate from your own project:

```bash
npm run fetch-schema
```

This runs `scripts/fetch-schema.js`, which fetches the pg\_graphql introspection result and writes SDL to `schema.graphql` using `buildClientSchema` + `printSchema` from the `graphql` package. No extra tooling required.

---

## Relay + pg\_graphql Integration

This is the most complex part of the project. `pg_graphql` exposes a valid GraphQL API, but it diverges from hand-written schemas in ways that break Relay's default assumptions. Below is a full account of each problem and how it is handled.

### 1. `nodeId` vs `id` as the global identifier

Relay requires a field named `id: ID!` on every cacheable object. `pg_graphql` implements the [Relay Global Object Identification spec](https://relay.dev/graphql/objectidentification.htm) but uses `nodeId` as the field name.

**Fix:** `relay.config.js` tells the compiler to treat `nodeId` as the identity field:

```js
schemaConfig: {
  nodeInterfaceIdField: 'nodeId',
  nodeInterfaceIdVariableName: 'nodeId',
}
```

**Important side effect:** `nodeId` is a computed base64 value, not a real column. pg\_graphql exposes it in filter inputs (`nodeId: IDFilter`) but cannot actually use it to match rows in UPDATE or DELETE — the filter returns `records: []` with no error. All mutations in this project therefore use `filter: { id: { eq: $id } }` with the real UUID primary key.

### 2. Naming conventions (`inflect_names = false`)

The Supabase default (`inflect_names = false`) generates names directly from Postgres identifiers:

| What | pg\_graphql name | Conventional name |
|---|---|---|
| Query field | `issuesCollection` | `issues` |
| Relation field | `issue_labelsCollection` | `issueLabels` |
| Update mutation | `updateissuesCollection` | `updateIssue` |
| Insert mutation | `insertIntoissue_labelsCollection` | `addIssueLabel` |

The project intentionally uses the exact field and mutation names that proved to work against the current pg\_graphql runtime and Relay query transformation flow, even when they differ from more conventional GraphQL naming expectations. All GraphQL operations are written using these exact names; the committed `schema.graphql` reflects them so the Relay compiler validates them.

### 3. Turbopack does not support `babel-plugin-relay`

Relay's standard setup uses `babel-plugin-relay` to transform `` graphql`...` `` tags at build time. Turbopack (the Next.js 15+ default) does not run Babel plugins.

**Fix:** Import pre-compiled artifacts directly. Fragment/query/mutation definitions live in `graphql/*.ts` as relay-compiler source; components import the compiled artifacts from `__generated__/`:

```ts
// components/issues/IssueListItem.tsx
import IssueListItemIssueNode from '@/__generated__/IssueListItem_issue.graphql'

const issue = useFragment(IssueListItemIssueNode, issueRef)
```

This is semantically identical to what `babel-plugin-relay` would produce and works with any bundler.

### 4. pg\_graphql does not resolve nested fragment spreads

Relay generates query text where fragment A spreads fragment B (e.g. `IssueList_query` spreads `IssueListItem_issue`). pg\_graphql only resolves one level of named fragment spreads, causing errors like `no fragment named IssueListItem_issue on type issues`.

**Fix:** `lib/relay/network.ts` — `inlineAllFragments` pre-processes query text before it is sent to Supabase. Every named fragment spread is recursively replaced with an inline fragment; named fragment definitions are stripped from the document.

### 5. `__typename` casing mismatch

`pg_graphql` with `inflect_names = false` returns lowercase `__typename` values (`"issues"`, `"comments"`) while Relay's store expects PascalCase (`"Issues"`, `"Comments"`) to match the schema type names. Mismatches cause `RelayModernRecord` to warn and discard the update.

**Fix:** `lib/relay/network.ts` — `normalizeTypenames` walks the raw JSON response and rewrites `__typename` values using a static map before Relay processes it:

```ts
const TYPENAME_MAP: Record<string, string> = {
  issues: 'Issues', users: 'Users', labels: 'Labels',
  comments: 'Comments', issue_labels: 'IssueLabels',
}
```

### 6. Type conditions on inline fragments must be lowercased

When `inlineAllFragments` replaces `...FragmentName` with `... on TypeName { ... }`, the type condition must use the lowercase table name (`issues`, not `Issues`) because that is what pg\_graphql's runtime checks against. But completely stripping type conditions breaks sub-relation resolution in some contexts.

**Fix:** Type conditions are kept but lowercased. The one exception is `Query` (the root type): pg\_graphql silently ignores `... on Query { }` inside a query operation, so that type condition is stripped entirely to ensure root-level fields are inlined without wrapping.

```ts
function lowerTypeCondition(typeCondition: NamedTypeNode | null | undefined) {
  if (!typeCondition) return undefined
  const name = typeCondition.name.value
  if (name === 'Query' || name === 'query') return undefined
  return { ...typeCondition, name: { ...typeCondition.name, value: name.toLowerCase() } }
}
```

### 7. Relay pagination via `node()` fails for sub-relations

Relay's `@refetchable` on a non-root fragment (e.g. `fragment X on Issues`) generates a pagination query using `node(nodeId: ...)`. pg\_graphql's `node()` implementation does not correctly resolve collection sub-relations inside typed inline fragments on the returned object, producing `"Invalid input for NonNull type"` when `loadNext` is called.

**Fix:** The comment thread pagination fragment is anchored at `Query` instead of `Issues`:

```graphql
fragment CommentThread_query on Query
@argumentDefinitions(issueId: { type: "UUID!" }, first: { type: "Int", defaultValue: 10 }, after: { type: "Cursor" })
@refetchable(queryName: "CommentThreadPaginationQuery") {
  commentsCollection(filter: { issue_id: { eq: $issueId } }, first: $first, after: $after, orderBy: [{ created_at: AscNullsLast }])
  @connection(key: "CommentThread_commentsCollection") {
    edges { node { nodeId ...CommentThread_comment } }
  }
}
```

This generates a root-level refetch query (no `node()` lookup), which pg\_graphql handles correctly.

### 8. Optimistic updater rollback

The standard Relay `optimisticUpdater` pattern updates the store before the server responds and rolls back on error. With `pg_graphql`, mutation responses sometimes fail store normalization (due to the `__typename` casing issues described above), causing Relay to roll back the optimistic patch even on a successful mutation — a visible flicker.

**Fix:** Local component state drives the UI immediately; Relay is not involved in the optimistic path. The state reverts via `onError` only if the server confirms failure. A `useEffect` in each component syncs the local state from the Relay fragment whenever the store is updated externally (e.g. after a Realtime-triggered refetch):

```ts
const [localStatus, setLocalStatus] = useState(issue.status ?? 'OPEN')

// Sync from store when Realtime refetch updates the fragment
useEffect(() => { setLocalStatus(issue.status ?? 'OPEN') }, [issue.status])

const handleStatusChange = (status: string) => {
  const prev = localStatus
  setLocalStatus(status)                              // immediate
  commitStatus({
    variables: { id: issue.id as string, status },
    onError() { setLocalStatus(prev) },               // revert on confirmed error
  })
}
```

---

## Architecture Decisions

### Client-only Relay environment

The Relay environment runs entirely on the client. Next.js page files are thin RSC wrappers that render `<Suspense>` boundaries around client component trees. This avoids the complexity of serializing Relay store records across the RSC boundary for the initial render.

The trade-off is a loading skeleton on first paint. The alternative — running `fetchQuery` on the server and hydrating from serialized store JSON — is the right long-term direction and is documented in Trade-offs.

### Fragment co-location on the detail page

Each section of the detail page owns its own Relay fragment:

| Component | Fragment | Fields |
|---|---|---|
| `IssueHeader` | `IssueHeader_issue` | title, status, priority, created\_at |
| `IssueDescription` | `IssueDescription_issue` | description |
| `IssueSidebar` | `IssueSidebar_issue` | assignee\_id, users, issue\_labelsCollection |
| `CommentThread` | `CommentThread_query` | paginated commentsCollection (on Query) |

`IssueDetailContent_issue` spreads the first three. `CommentThread_query` is spread directly from `IssueDetailQuery` at the root (required by the `node()` limitation described above).

### Real-time update flow

**Issue list:** One Supabase Realtime channel subscribes to `postgres_changes` on both `issues` and `issue_labels`. Any event triggers a `refetch` of the Relay connection with the current filters. The subscription is set up once on mount; `useRef` holds the latest `refetch` function and `filters` object to avoid the stale-closure bug that would occur if the event handler captured them directly from the render closure.

**Issue detail:** A Supabase Realtime channel subscribes to `UPDATE` events on the specific issue row (`filter: id=eq.${id}`). Each event increments a `fetchKey` state variable, causing `useLazyLoadQuery` to re-fetch in the background while `store-and-network` keeps current data visible. When the fetch resolves, the `useEffect` hooks in each section component sync their local state from the updated fragment data.

### Cursor-based pagination

Issue list: `usePaginationFragment` with `@connection` and `@refetchable` on a `Query`-level fragment, driving a "Load more" button.

Comment thread: same pattern, also on `Query` (not `Issues`) to avoid the pg\_graphql `node()` limitation.

---

## Trade-offs

### Label filtering is client-side

Status and priority filters are applied server-side in the GraphQL query (`filter: { status: $statusFilter, priority: $priorityFilter }`). Label filtering happens in JavaScript after the fetch.

The generated schema and introspection output suggested that relation-based filtering should be available — `IssuesFilter` exposes `issue_labelsCollection: IssueLabelsFilter`, and `IssueLabelsFilter` exposes `label_id: UUIDFilter` with an `in` operator. The natural server-side query shape would be:

```graphql
filter: { issue_labelsCollection: { label_id: { in: $labelIds } } }
```

In practice, this shape was rejected at query execution time by the current Supabase/pg_graphql setup with `Input for type issuesFilter contains extra keys ["issue_labelsCollection"]`. The introspection schema and the runtime query validator were out of sync. Rather than treat this as a hard platform limitation, client-side filtering was chosen as a stable, predictable workaround for the current setup.

The practical cost: all issues matching the other active filters are fetched, then the label filter is applied in JS. For the dataset size in this project this is negligible.

**Next steps if server-side label filtering is needed:** upgrade `pg_graphql` to a version where this query shape is validated consistently, or expose a Postgres view/function that performs the label join server-side and surface it as a dedicated GraphQL field.

### Local state instead of Relay store mutations for optimistic UI

The typical Relay `optimisticUpdater` / `optimisticResponse` pattern proved unreliable with `pg_graphql` due to `__typename` casing and normalized record mismatches. Local component state was chosen as the optimistic UI mechanism — it is simpler, fully predictable, and does not depend on Relay store normalization working correctly for every field type.

### Detail page Realtime is a supplementary enhancement

The detail page Realtime subscription was added to reflect cross-tab edits (e.g. another user changes the status in a different tab). Mutations made on the same page are already reflected immediately via local state. The Realtime subscription would matter in a multi-user scenario; for a demo it is mainly visible when the same issue is open in two browser tabs.

### No Realtime for new comments from other users

The `comments` table is not in the Realtime subscription. Comments posted by the current user appear immediately (via local state append); comments posted by another user in a different tab require a page refresh. Closing this gap requires adding `comments` to the publication and a subscription in `CommentThread`.

### Zod not yet wired up

`zod` is in `package.json` per the requirements spec. The intended use is validation of filter inputs at the `IssueFilters` boundary before they become GraphQL variables. It was not implemented within the time available.

### No authentication

All requests use the Supabase anon key with permissive RLS (`for all using (true)`). In a real application: Supabase Auth, user JWT in the `Authorization` header, row-level policies scoped to the authenticated user.

### No tests

No unit, integration, or E2E tests. Priority was on demonstrating the Relay + pg\_graphql integration. A solid test plan would include:
- Unit tests for `inlineAllFragments` and `normalizeTypenames` (pure functions, easy to test in isolation)
- Component tests with Relay `MockEnvironment`
- Playwright E2E for the main flows (list → filter → detail → edit → comment)

---

## Manual Verification

### Issue list

1. Open [http://localhost:3000/issues](http://localhost:3000/issues)
2. Confirm issues appear with title, status badge, priority icon, labels, assignee avatar
3. Click "Load more" — confirm next page appends below without full reload

### Filters

1. Click **Status** — select one or more; list narrows immediately
2. Click **Priority** — same
3. Click **Labels** — list is filtered client-side; badge count updates
4. Click **Clear filters** — list resets

### Detail editing

1. Click any issue title to open detail page
2. **Title:** click the title text → type → Enter to save, Esc to cancel
3. **Description:** click the description area → type → ⌘↵ to save, Esc to cancel
4. **Status:** click the status badge → pick a new status → updates immediately
5. **Priority:** click the priority badge → pick new value → updates immediately
6. **Assignee:** click the assignee area → pick a user or Unassign
7. **Labels:** click "Edit labels…" → toggle labels on/off → changes are immediate

For each edit: confirm the value persists after refreshing the page.

### Comments

1. On a detail page, type a comment and press ⌘↵ or click **Comment**
2. Confirm the comment appears immediately below (local append)
3. If there are more than 10 comments, confirm "↑ Load earlier comments" appears and works

### Real-time (two tabs)

1. Open the issue list in **Tab A** and **Tab B**
2. In Tab A, open an issue and change its **status** — confirm Tab B updates within ~1–2 seconds
3. Back on the detail page in Tab A, add or remove a **label** — confirm Tab B reflects the label change without refreshing (requires `issue_labels` in the Realtime publication)

### Optimistic rollback

All field edits update immediately in the UI before the server responds. To observe the rollback:
1. Open the detail page
2. Temporarily set `NEXT_PUBLIC_SUPABASE_ANON_KEY` to an invalid value and reload
3. Try changing the status — the badge updates instantly, then reverts when the mutation error is received
4. A toast error message confirms the failure

---

## Deployment

The project is configured for deployment to Vercel.

### Deploy to Vercel

```bash
# Install Vercel CLI if needed
npm i -g vercel

vercel deploy
```

Or connect the repository in the Vercel dashboard and deploy from there.

### Required environment variables on Vercel

Set the following in **Vercel Dashboard → Project → Settings → Environment Variables**:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The `build` script (`relay-compiler && next build`) runs the Relay compiler before the Next.js build, so pre-compiled artifacts are always up to date in the deployment.

### Live demo

https://issue-tracker-sigma-one.vercel.app/issues
