/**
 * @generated SignedSource<<c44cc491757ac602dbef7c982bfe3e50>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IssueDetailQuery$variables = {
  id: any;
};
export type IssueDetailQuery$data = {
  readonly issuesCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: any;
        readonly nodeId: string;
        readonly " $fragmentSpreads": FragmentRefs<"IssueDetailContent_issue">;
      };
    }>;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"CommentThread_query">;
};
export type IssueDetailQuery = {
  response: IssueDetailQuery$data;
  variables: IssueDetailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "eq",
    "variableName": "id"
  }
],
v2 = [
  {
    "fields": [
      {
        "fields": (v1/*: any*/),
        "kind": "ObjectValue",
        "name": "id"
      }
    ],
    "kind": "ObjectValue",
    "name": "filter"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeId",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created_at",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar_url",
  "storageKey": null
},
v8 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endCursor",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasNextPage",
  "storageKey": null
},
v13 = [
  {
    "fields": [
      {
        "fields": (v1/*: any*/),
        "kind": "ObjectValue",
        "name": "issue_id"
      }
    ],
    "kind": "ObjectValue",
    "name": "filter"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": [
      {
        "created_at": "AscNullsLast"
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "IssuesConnection",
        "kind": "LinkedField",
        "name": "issuesCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "IssuesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Issues",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "IssueDetailContent_issue"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "args": [
          {
            "kind": "Variable",
            "name": "issueId",
            "variableName": "id"
          }
        ],
        "kind": "FragmentSpread",
        "name": "CommentThread_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IssueDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "IssuesConnection",
        "kind": "LinkedField",
        "name": "issuesCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "IssuesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Issues",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "status",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "priority",
                    "storageKey": null
                  },
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "assignee_id",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Users",
                    "kind": "LinkedField",
                    "name": "users",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v8/*: any*/),
                    "concreteType": "IssueLabelsConnection",
                    "kind": "LinkedField",
                    "name": "issue_labelsCollection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "IssueLabelsEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "IssueLabels",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "label_id",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Labels",
                                "kind": "LinkedField",
                                "name": "labels",
                                "plural": false,
                                "selections": [
                                  (v3/*: any*/),
                                  (v4/*: any*/),
                                  (v6/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "color",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              (v9/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v10/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageInfo",
                        "kind": "LinkedField",
                        "name": "pageInfo",
                        "plural": false,
                        "selections": [
                          (v11/*: any*/),
                          (v12/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "ClientExtension",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__id",
                            "storageKey": null
                          }
                        ]
                      }
                    ],
                    "storageKey": "issue_labelsCollection(first:20)"
                  },
                  {
                    "alias": null,
                    "args": (v8/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "IssueSidebar_issue_labelsCollection",
                    "kind": "LinkedHandle",
                    "name": "issue_labelsCollection"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v13/*: any*/),
        "concreteType": "CommentsConnection",
        "kind": "LinkedField",
        "name": "commentsCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CommentsEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Comments",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "body",
                    "storageKey": null
                  },
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Users",
                    "kind": "LinkedField",
                    "name": "users",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              (v10/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              (v12/*: any*/),
              (v11/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v13/*: any*/),
        "filters": [
          "filter",
          "orderBy"
        ],
        "handle": "connection",
        "key": "CommentThread_commentsCollection",
        "kind": "LinkedHandle",
        "name": "commentsCollection"
      }
    ]
  },
  "params": {
    "cacheID": "b8469ec94424c7f1c3e4418cbb9db089",
    "id": null,
    "metadata": {},
    "name": "IssueDetailQuery",
    "operationKind": "query",
    "text": "query IssueDetailQuery(\n  $id: UUID!\n) {\n  issuesCollection(filter: {id: {eq: $id}}, first: 1) {\n    edges {\n      node {\n        nodeId\n        id\n        ...IssueDetailContent_issue\n      }\n    }\n  }\n  ...CommentThread_query_qK3G1\n}\n\nfragment CommentThread_comment on Comments {\n  nodeId\n  id\n  body\n  created_at\n  users {\n    name\n    avatar_url\n    nodeId\n  }\n}\n\nfragment CommentThread_query_qK3G1 on Query {\n  commentsCollection(filter: {issue_id: {eq: $id}}, first: 10, orderBy: [{created_at: AscNullsLast}]) {\n    edges {\n      node {\n        nodeId\n        ...CommentThread_comment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment IssueDescription_issue on Issues {\n  nodeId\n  id\n  description\n}\n\nfragment IssueDetailContent_issue on Issues {\n  nodeId\n  id\n  title\n  ...IssueHeader_issue\n  ...IssueDescription_issue\n  ...IssueSidebar_issue\n}\n\nfragment IssueHeader_issue on Issues {\n  nodeId\n  id\n  title\n  status\n  priority\n  created_at\n}\n\nfragment IssueSidebar_issue on Issues {\n  nodeId\n  id\n  assignee_id\n  users {\n    nodeId\n    name\n    avatar_url\n  }\n  issue_labelsCollection(first: 20) {\n    edges {\n      node {\n        nodeId\n        label_id\n        labels {\n          nodeId\n          id\n          name\n          color\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1ac307955bd591562e8e996fa17ed0a0";

export default node;
