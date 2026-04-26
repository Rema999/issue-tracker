import { graphql } from 'react-relay'

graphql`
  fragment IssueSidebar_issue on Issues {
    nodeId
    id
    assignee_id
    users {
      nodeId
      name
      avatar_url
    }
    issue_labelsCollection(first: 20) @connection(key: "IssueSidebar_issue_labelsCollection") {
      __id
      edges {
        node {
          nodeId
          label_id
          labels {
            nodeId
            id
            name
            color
          }
        }
      }
    }
  }
`

graphql`
  mutation IssueSidebarAssigneeMutation($id: UUID!, $assigneeId: UUID) {
    updateissuesCollection(
      filter: { id: { eq: $id } }
      set: { assignee_id: $assigneeId }
      atMost: 1
    ) {
      records {
        nodeId
        id
        assignee_id
        users {
          nodeId
          name
          avatar_url
        }
      }
    }
  }
`

graphql`
  mutation IssueSidebarAddLabelMutation($issueId: UUID!, $labelId: UUID!) {
    insertIntoissue_labelsCollection(
      objects: [{ issue_id: $issueId, label_id: $labelId }]
    ) {
      records {
        nodeId
        issue_id
        label_id
        labels {
          nodeId
          id
          name
          color
        }
      }
    }
  }
`

graphql`
  mutation IssueSidebarRemoveLabelMutation($issueId: UUID!, $labelId: UUID!) {
    deleteFromissue_labelsCollection(
      filter: { issue_id: { eq: $issueId }, label_id: { eq: $labelId } }
    ) {
      records {
        nodeId
      }
    }
  }
`

graphql`
  query IssueSidebarUsersQuery {
    usersCollection(orderBy: [{ name: AscNullsLast }]) {
      edges {
        node {
          id
          name
          avatar_url
        }
      }
    }
  }
`

graphql`
  query IssueSidebarLabelsQuery {
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
