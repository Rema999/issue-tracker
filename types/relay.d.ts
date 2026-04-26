/**
 * Ambient TypeScript declarations for relay-runtime and react-relay v20.x.
 *
 * relay-runtime v20.x ships Flow types only (.js.flow), not TypeScript declarations.
 * These declarations cover the API surface used in this project, following the exact
 * type patterns emitted by the Relay compiler (v20.x, TypeScript output mode).
 */

// ─── relay-runtime ────────────────────────────────────────────────────────────

declare module 'relay-runtime' {
  export type Variables = Record<string, unknown>

  /**
   * FragmentRefs is used in generated fragment key types.
   * Using a mapped type makes FragmentRefs<"A" | "B"> structurally assignable to
   * FragmentRefs<"A"> — which is required for spread fragment compatibility.
   * (A parent fragment that spreads A and B can pass its data to a child that only needs A.)
   */
  export type FragmentRefs<TFragmentName extends string> = {
    readonly [K in TFragmentName]: unknown
  }

  export interface RequestParameters {
    id: string | null
    cacheID: string
    name: string
    operationKind: 'mutation' | 'query' | 'subscription'
    text: string | null
    metadata: Record<string, unknown>
  }

  export interface GraphQLSingularResponse {
    data?: Record<string, unknown> | null
    errors?: ReadonlyArray<{ message: string; locations?: unknown }>
    extensions?: Record<string, unknown>
  }

  export type GraphQLResponse =
    | GraphQLSingularResponse
    | ReadonlyArray<GraphQLSingularResponse>

  export interface FetchFunction {
    (
      request: RequestParameters,
      variables: Variables,
      cacheConfig: CacheConfig,
    ): Promise<GraphQLResponse> | GraphQLResponse
  }

  export interface CacheConfig {
    force?: boolean
    poll?: number | null
    liveConfigID?: string | null
    transactionID?: number | null
  }

  export interface Network {
    execute: (
      request: RequestParameters,
      variables: Variables,
      cacheConfig: CacheConfig,
    ) => unknown
  }

  export const Network: {
    create(fetchFunction: FetchFunction): Network
  }

  // ─── Store / RecordProxy ────────────────────────────────────────────────────
  export interface RecordProxy {
    copyFieldsFrom(source: RecordProxy): void
    getDataID(): string
    getLinkedRecord(name: string, args?: Variables | null): RecordProxy | null
    getLinkedRecords(name: string, args?: Variables | null): ReadonlyArray<RecordProxy | null> | null
    getOrCreateLinkedRecord(name: string, typeName: string, args?: Variables | null): RecordProxy
    getType(): string
    getValue(name: string, args?: Variables | null): unknown
    setLinkedRecord(record: RecordProxy, name: string, args?: Variables | null): RecordProxy
    setLinkedRecords(records: ReadonlyArray<RecordProxy | null | undefined>, name: string, args?: Variables | null): RecordProxy
    setValue(value: unknown, name: string, args?: Variables | null): RecordProxy
    invalidateRecord(): void
  }

  export interface RecordSourceProxy {
    create(dataID: string, typeName: string): RecordProxy
    delete(dataID: string): void
    get(dataID: string): RecordProxy | null
    getRoot(): RecordProxy
  }

  export interface RecordSourceSelectorProxy extends RecordSourceProxy {
    getRootField(fieldName: string): RecordProxy | null
    getPluralRootField(fieldName: string): ReadonlyArray<RecordProxy | null> | null
    invalidateStore(): void
  }

  export type StoreUpdater = (store: RecordSourceProxy) => void
  export type SelectorStoreUpdater<T = unknown> = (
    store: RecordSourceSelectorProxy,
    data: T,
  ) => void

  export class RecordSource {
    constructor(records?: Record<string, unknown>)
    get(key: string): unknown
    getRecordIDs(): string[]
    getStatus(key: string): string
    has(key: string): boolean
    toJSON(): Record<string, unknown>
  }

  export class Store {
    constructor(source: RecordSource, options?: { gcReleaseBufferSize?: number })
    getSource(): RecordSource
    retain(operation: unknown): { dispose(): void }
    publish(source: RecordSource): void
    notify(): void
  }

  export interface EnvironmentConfig {
    network: Network
    store: Store
    isServer?: boolean
    log?: ((event: unknown) => void) | null
  }

  export class Environment {
    constructor(config: EnvironmentConfig)
    getStore(): Store
    execute(config: unknown): unknown
    executeMutation(config: unknown): unknown
  }

  // ─── GraphQL tag ────────────────────────────────────────────────────────────
  export interface GraphQLTaggedNode {
    kind: string
    name?: string
    text?: string
  }

  export function graphql(strings: TemplateStringsArray): GraphQLTaggedNode

  // ─── commitLocalUpdate ──────────────────────────────────────────────────────
  export function commitLocalUpdate(
    environment: Environment,
    updater: StoreUpdater,
  ): void

  // ─── ConnectionHandler ──────────────────────────────────────────────────────
  export const ConnectionHandler: {
    getConnection(
      record: RecordProxy,
      key: string,
      filters?: Variables | null,
    ): RecordProxy | null
    createEdge(
      store: RecordSourceSelectorProxy | RecordSourceProxy,
      connection: RecordProxy,
      node: RecordProxy,
      edgeType: string,
    ): RecordProxy
    insertEdgeBefore(connection: RecordProxy, newEdge: RecordProxy, cursor?: string | null): void
    insertEdgeAfter(connection: RecordProxy, newEdge: RecordProxy, cursor?: string | null): void
    deleteNode(connection: RecordProxy, nodeID: string): void
  }

  // Internal Relay node types used in generated artifacts
  export interface ReaderFragment { kind: 'Fragment' }
  export interface ConcreteRequest { kind: 'Request' }
  export interface NormalizationLinkedField { kind: string }

  export function getRequest(taggedNode: GraphQLTaggedNode): unknown
  export function createOperationDescriptor(
    request: unknown,
    variables: Variables,
  ): unknown
}

// ─── react-relay ──────────────────────────────────────────────────────────────

declare module 'react-relay' {
  import type {
    Environment,
    GraphQLTaggedNode,
    Variables,
    StoreUpdater,
    SelectorStoreUpdater,
  } from 'relay-runtime'
  import type * as React from 'react'

  export { graphql } from 'relay-runtime'

  export function RelayEnvironmentProvider(props: {
    environment: Environment
    children: React.ReactNode
  }): React.JSX.Element

  export function useRelayEnvironment(): Environment

  // ─── useLazyLoadQuery ───────────────────────────────────────────────────────
  export function useLazyLoadQuery<TQuery extends { variables: Variables; response: unknown }>(
    gqlQuery: GraphQLTaggedNode,
    variables: TQuery['variables'],
    options?: {
      fetchKey?: string | number
      fetchPolicy?: 'store-and-network' | 'network-only' | 'store-only' | 'store-or-network'
      networkCacheConfig?: unknown
    },
  ): TQuery['response']

  // ─── useFragment ────────────────────────────────────────────────────────────
  // Relay generated keys use `' $data'?: TData` to carry the data type.
  export function useFragment<TKey extends { ' $data'?: unknown; ' $fragmentSpreads'?: unknown }>(
    fragmentNode: GraphQLTaggedNode,
    key: TKey,
  ): NonNullable<TKey[' $data']>

  export function useFragment<TKey extends { ' $data'?: unknown; ' $fragmentSpreads'?: unknown }>(
    fragmentNode: GraphQLTaggedNode,
    key: TKey | null,
  ): NonNullable<TKey[' $data']> | null

  // ─── usePaginationFragment ──────────────────────────────────────────────────
  export interface PaginationFnConfig {
    fetchPolicy?: 'store-and-network' | 'network-only'
    onComplete?: (arg: Error | null) => void
  }

  export interface UsePaginationFragmentHookType<
    TQuery extends { variables: Variables; response: unknown },
    TFragmentData,
  > {
    data: TFragmentData
    loadNext(count: number, options?: PaginationFnConfig): void
    loadPrevious(count: number, options?: PaginationFnConfig): void
    hasNext: boolean
    hasPrevious: boolean
    isLoadingNext: boolean
    isLoadingPrevious: boolean
    refetch(
      variables: Partial<TQuery['variables']>,
      options?: { fetchPolicy?: 'store-and-network' | 'network-only' },
    ): void
  }

  export function usePaginationFragment<
    TQuery extends { variables: Variables; response: unknown },
    TKey extends { ' $data'?: unknown; ' $fragmentSpreads'?: unknown },
  >(
    fragmentNode: GraphQLTaggedNode,
    parentFragmentRef: TKey,
  ): UsePaginationFragmentHookType<TQuery, NonNullable<TKey[' $data']>>

  // ─── useMutation ────────────────────────────────────────────────────────────
  export type MutationConfig<TMutation extends { variables: Variables; response: unknown }> = {
    variables: TMutation['variables']
    onCompleted?: (
      response: TMutation['response'],
      errors: ReadonlyArray<unknown> | null | undefined,
    ) => void
    onError?: (error: Error) => void
    optimisticResponse?: TMutation['response']
    optimisticUpdater?: StoreUpdater
    updater?: SelectorStoreUpdater<TMutation['response']>
  }

  export function useMutation<TMutation extends { variables: Variables; response: unknown }>(
    mutation: GraphQLTaggedNode,
  ): [
    commitMutation: (config: MutationConfig<TMutation>) => void,
    isPending: boolean,
  ]
}
