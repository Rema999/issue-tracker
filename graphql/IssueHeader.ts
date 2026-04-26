import { graphql } from 'react-relay'

graphql`
  fragment IssueHeader_issue on Issues {
    nodeId
    id
    title
    status
    priority
    created_at
  }
`

graphql`
  mutation IssueHeaderTitleMutation($id: UUID!, $title: String!) {
    updateissuesCollection(
      filter: { id: { eq: $id } }
      set: { title: $title }
      atMost: 1
    ) {
      records {
        nodeId
        id
        title
      }
    }
  }
`

graphql`
  mutation IssueHeaderPriorityMutation($id: UUID!, $priority: String!) {
    updateissuesCollection(
      filter: { id: { eq: $id } }
      set: { priority: $priority }
      atMost: 1
    ) {
      records {
        nodeId
        id
        priority
      }
    }
  }
`

graphql`
  mutation IssueHeaderStatusMutation($id: UUID!, $status: String!) {
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
