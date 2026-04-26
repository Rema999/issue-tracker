import { graphql } from 'react-relay'

// Pagination fragment on Query (not on Issues) so that Relay generates a
// root-level refetch query instead of a node()-based one. pg_graphql supports
// the node() interface but does not correctly resolve sub-relations (like
// commentsCollection) inside typed inline fragments on node(), which causes
// "Invalid input for NonNull type" errors when loadNext is called.
graphql`
  fragment CommentThread_query on Query
  @argumentDefinitions(
    issueId: { type: "UUID!" }
    first: { type: "Int", defaultValue: 10 }
    after: { type: "Cursor" }
  )
  @refetchable(queryName: "CommentThreadPaginationQuery") {
    commentsCollection(
      filter: { issue_id: { eq: $issueId } }
      first: $first
      after: $after
      orderBy: [{ created_at: AscNullsLast }]
    ) @connection(key: "CommentThread_commentsCollection") {
      edges {
        node {
          nodeId
          ...CommentThread_comment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

graphql`
  fragment CommentThread_comment on Comments {
    nodeId
    id
    body
    created_at
    users {
      name
      avatar_url
    }
  }
`
