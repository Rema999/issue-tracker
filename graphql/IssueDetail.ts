import { graphql } from 'react-relay'

graphql`
  query IssueDetailQuery($id: UUID!) {
    issuesCollection(filter: { id: { eq: $id } }, first: 1) {
      edges {
        node {
          nodeId
          id
          ...IssueDetailContent_issue
        }
      }
    }
    ...CommentThread_query @arguments(issueId: $id)
  }
`

graphql`
  fragment IssueDetailContent_issue on Issues {
    nodeId
    id
    title
    ...IssueHeader_issue
    ...IssueDescription_issue
    ...IssueSidebar_issue
  }
`
