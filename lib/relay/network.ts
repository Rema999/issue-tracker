import { Network, RequestParameters, Variables, GraphQLResponse } from 'relay-runtime'
import { parse, print, Kind } from 'graphql'
import type { DocumentNode, DefinitionNode, FragmentDefinitionNode, SelectionNode, NamedTypeNode } from 'graphql'

// ─── pg_graphql typename normalization ────────────────────────────────────────
//
// pg_graphql with `inflect_names = false` (the Supabase default) returns
// __typename values that match the Postgres table name as-is (lowercase),
// e.g. "issues" instead of "Issues".
//
// Our schema.graphql — and therefore all compiled Relay artifacts — use
// PascalCase type names. Relay's RelayModernRecord warns and discards the
// update when the stored `concreteType` ("Issues") conflicts with the
// response __typename ("issues").
//
// Fix: rewrite __typename fields in the raw JSON response before Relay
// normalises it. The mapping below covers every table in our schema.
const TYPENAME_MAP: Record<string, string> = {
  issues: 'Issues',
  users: 'Users',
  labels: 'Labels',
  comments: 'Comments',
  issue_labels: 'IssueLabels',
  // connection / edge / pageInfo types are unnamed in responses (no __typename)
}

function normalizeTypenames(data: unknown): unknown {
  if (data === null || data === undefined || typeof data !== 'object') return data
  if (Array.isArray(data)) return data.map(normalizeTypenames)
  const obj = data as Record<string, unknown>
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k,
      k === '__typename' && typeof v === 'string'
        ? (TYPENAME_MAP[v] ?? v)
        : normalizeTypenames(v),
    ]),
  )
}

// ─── Fragment inlining ────────────────────────────────────────────────────────
//
// pg_graphql does not recursively resolve nested fragment spreads — it only
// processes fragments that are directly referenced from the operation, not
// fragments referenced from within other fragments.
//
// We replace every named fragment spread `...Foo` with an inline fragment and
// strip all fragment definitions. Type conditions are kept but lowercased to
// match pg_graphql's table-name casing (e.g. `... on issues { }` rather than
// `... on Issues { }`). The exception is the Query root type: pg_graphql
// silently ignores `... on Query { }` inside a query operation, so we strip
// that type condition entirely to ensure the fields are inlined at the root.
function inlineAllFragments(queryText: string): string {
  let doc: DocumentNode
  try {
    doc = parse(queryText)
  } catch {
    return queryText
  }

  const frags = new Map<string, FragmentDefinitionNode>()
  for (const def of doc.definitions) {
    if (def.kind === Kind.FRAGMENT_DEFINITION) {
      frags.set(def.name.value, def)
    }
  }

  function lowerTypeCondition(typeCondition: NamedTypeNode | null | undefined): NamedTypeNode | undefined {
    if (!typeCondition) return undefined
    const name: string = typeCondition.name.value
    // Query is the root type — a type condition on Query inside a query operation
    // is redundant and pg_graphql silently drops such inline fragments.
    // Return undefined so the fields are inlined without any type condition.
    if (name === 'Query' || name === 'query') return undefined
    return {
      ...typeCondition,
      name: { ...typeCondition.name, value: name.toLowerCase() },
    }
  }

  function resolveSelections(selections: ReadonlyArray<SelectionNode>, depth = 0): SelectionNode[] {
    if (depth > 12) return Array.from(selections)
    return selections.flatMap((sel): SelectionNode[] => {
      if (sel.kind === Kind.FRAGMENT_SPREAD) {
        const frag = frags.get(sel.name.value)
        if (!frag) return [sel]
        // Inline the fragment, keeping the type condition but lowercased so
        // pg_graphql can route the fields correctly (it uses lowercase table names).
        // normalizeTypenames handles the reverse direction in responses.
        return [
          {
            kind: Kind.INLINE_FRAGMENT,
            typeCondition: lowerTypeCondition(frag.typeCondition),
            directives: [],
            selectionSet: {
              kind: Kind.SELECTION_SET,
              selections: resolveSelections(frag.selectionSet.selections, depth + 1),
            },
          } as SelectionNode,
        ]
      }
      if (sel.selectionSet) {
        return [
          {
            ...sel,
            // Also lowercase any existing inline fragment type conditions in the operation.
            // typeCondition only exists on InlineFragmentNode; FieldNode is handled by the spread.
            typeCondition: sel.kind === Kind.INLINE_FRAGMENT
              ? lowerTypeCondition(sel.typeCondition)
              : undefined,
            selectionSet: {
              kind: Kind.SELECTION_SET,
              selections: resolveSelections(sel.selectionSet.selections, depth + 1),
            },
          } as SelectionNode,
        ]
      }
      return [sel]
    })
  }

  const flattenedDefs: DefinitionNode[] = []
  for (const def of doc.definitions) {
    if (def.kind === Kind.FRAGMENT_DEFINITION) continue
    if ('selectionSet' in def && def.selectionSet) {
      flattenedDefs.push({
        ...def,
        selectionSet: {
          kind: Kind.SELECTION_SET as const,
          selections: resolveSelections(def.selectionSet.selections),
        },
      } as DefinitionNode)
    } else {
      flattenedDefs.push(def)
    }
  }

  return print({ kind: Kind.DOCUMENT, definitions: flattenedDefs })
}

// ─── Network fetch ────────────────────────────────────────────────────────────

async function fetchGraphQL(
  request: RequestParameters,
  variables: Variables,
): Promise<GraphQLResponse> {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const queryText = request.text ? inlineAllFragments(request.text) : ''

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ query: queryText, variables }),
  })

  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`)
  }

  const json = await response.json()

  // Normalise __typename values from pg_graphql lowercase → our PascalCase schema
  return normalizeTypenames(json) as GraphQLResponse
}

export const network = Network.create(fetchGraphQL)
