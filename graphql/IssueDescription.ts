import { graphql } from 'react-relay'

graphql`
  fragment IssueDescription_issue on Issues {
    nodeId
    id
    description
  }
`

graphql`
  mutation IssueDescriptionMutation($id: UUID!, $description: String!) {
    updateissuesCollection(
      filter: { id: { eq: $id } }
      set: { description: $description }
      atMost: 1
    ) {
      records {
        nodeId
        id
        description
      }
    }
  }
`
