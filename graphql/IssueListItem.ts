import { graphql } from 'react-relay'

graphql`
  fragment IssueListItem_issue on Issues {
    nodeId
    id
    title
    status
    priority
    created_at
    users {
      name
      avatar_url
    }
    issue_labelsCollection(first: 5) {
      edges {
        node {
          labels {
            id
            name
            color
          }
        }
      }
    }
  }
`
