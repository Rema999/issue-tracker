// Relay compiler source for IssueList — never imported at runtime.
// Components import pre-compiled artifacts from __generated__/ directly.
// See README.md (Problem 3) for why this approach is used instead of babel-plugin-relay.
import { graphql } from 'react-relay'

graphql`
  query IssueListQuery(
    $first: Int!
    $after: Cursor
    $statusFilter: StringFilter
    $priorityFilter: StringFilter
  ) {
    ...IssueList_query
      @arguments(
        first: $first
        after: $after
        statusFilter: $statusFilter
        priorityFilter: $priorityFilter
      )
    labelsCollection(orderBy: [{ name: AscNullsLast }]) {
      edges {
        node {
          id
          name
          color
        }
      }
    }
  }
`

graphql`
  fragment IssueList_query on Query
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 20 }
    after: { type: "Cursor" }
    statusFilter: { type: "StringFilter" }
    priorityFilter: { type: "StringFilter" }
  )
  @refetchable(queryName: "IssueListPaginationQuery") {
    issuesCollection(
      first: $first
      after: $after
      filter: { status: $statusFilter, priority: $priorityFilter }
      orderBy: [{ created_at: DescNullsLast }]
    ) @connection(key: "IssueList_issuesCollection") {
      __id
      edges {
        node {
          nodeId
          id
          status
          ...IssueListItem_issue
          issue_labelsCollection(first: 5) {
            edges {
              node {
                label_id
              }
            }
          }
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
  mutation IssueListStatusMutation($id: UUID!, $status: String!) {
    updateissuesCollection(
      filter: { id: { eq: $id } }
      set: { status: $status }
      atMost: 1
    ) {
      records {
        nodeId
        id
        status
      }
    }
  }
`
