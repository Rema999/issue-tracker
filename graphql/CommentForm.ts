import { graphql } from 'react-relay'

graphql`
  mutation CommentFormMutation($issueId: UUID!, $body: String!) {
    insertIntocommentsCollection(
      objects: [{ issue_id: $issueId, body: $body }]
    ) {
      records {
        nodeId
        id
        body
        created_at
        author_id
        users {
          nodeId
          name
          avatar_url
        }
      }
    }
  }
`
