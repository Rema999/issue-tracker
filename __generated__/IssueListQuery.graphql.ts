/**
 * @generated SignedSource<<4d959ae8ed9312cdc66cb193206305d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FilterIs = "NOT_NULL" | "NULL" | "%future added value";
export type StringFilter = {
  eq?: string | null | undefined;
  gt?: string | null | undefined;
  gte?: string | null | undefined;
  ilike?: string | null | undefined;
  in?: ReadonlyArray<string> | null | undefined;
  iregex?: string | null | undefined;
  is?: FilterIs | null | undefined;
  like?: string | null | undefined;
  lt?: string | null | undefined;
  lte?: string | null | undefined;
  ne?: string | null | undefined;
  nin?: ReadonlyArray<string> | null | undefined;
  regex?: string | null | undefined;
  startsWith?: string | null | undefined;
};
export type IssueListQuery$variables = {
  after?: any | null | undefined;
  first: number;
  priorityFilter?: StringFilter | null | undefined;
  statusFilter?: StringFilter | null | undefined;
};
export type IssueListQuery$data = {
  readonly labelsCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly color: string | null | undefined;
        readonly id: any;
        readonly name: string | null | undefined;
      };
    }>;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"IssueList_query">;
};
export type IssueListQuery = {
  response: IssueListQuery$data;
  variables: IssueListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "priorityFilter"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "statusFilter"
},
v4 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v5 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v6 = [
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": [
      {
        "name": "AscNullsLast"
      }
    ]
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "color",
  "storageKey": null
},
v10 = [
  (v4/*: any*/),
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "priority",
        "variableName": "priorityFilter"
      },
      {
        "kind": "Variable",
        "name": "status",
        "variableName": "statusFilter"
      }
    ],
    "kind": "ObjectValue",
    "name": "filter"
  },
  (v5/*: any*/),
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": [
      {
        "created_at": "DescNullsLast"
      }
    ]
  }
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeId",
  "storageKey": null
},
v12 = [
  (v7/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/),
  (v11/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueListQuery",
    "selections": [
      {
        "args": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "Variable",
            "name": "priorityFilter",
            "variableName": "priorityFilter"
          },
          {
            "kind": "Variable",
            "name": "statusFilter",
            "variableName": "statusFilter"
          }
        ],
        "kind": "FragmentSpread",
        "name": "IssueList_query"
      },
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "LabelsConnection",
        "kind": "LinkedField",
        "name": "labelsCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LabelsEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Labels",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "labelsCollection(orderBy:[{\"name\":\"AscNullsLast\"}])"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "IssueListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v10/*: any*/),
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
                  (v11/*: any*/),
                  (v7/*: any*/),
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
                    "name": "title",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "priority",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "created_at",
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
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "avatar_url",
                        "storageKey": null
                      },
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 5
                      }
                    ],
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
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Labels",
                                "kind": "LinkedField",
                                "name": "labels",
                                "plural": false,
                                "selections": (v12/*: any*/),
                                "storageKey": null
                              },
                              (v11/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "label_id",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "issue_labelsCollection(first:5)"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              }
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
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v10/*: any*/),
        "filters": [
          "filter",
          "orderBy"
        ],
        "handle": "connection",
        "key": "IssueList_issuesCollection",
        "kind": "LinkedHandle",
        "name": "issuesCollection"
      },
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "LabelsConnection",
        "kind": "LinkedField",
        "name": "labelsCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LabelsEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Labels",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": (v12/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "labelsCollection(orderBy:[{\"name\":\"AscNullsLast\"}])"
      }
    ]
  },
  "params": {
    "cacheID": "c8f52fd662e0d672bdd9441ceada45cf",
    "id": null,
    "metadata": {},
    "name": "IssueListQuery",
    "operationKind": "query",
    "text": "query IssueListQuery(\n  $first: Int!\n  $after: Cursor\n  $statusFilter: StringFilter\n  $priorityFilter: StringFilter\n) {\n  ...IssueList_query_2q1J3d\n  labelsCollection(orderBy: [{name: AscNullsLast}]) {\n    edges {\n      node {\n        id\n        name\n        color\n        nodeId\n      }\n    }\n  }\n}\n\nfragment IssueListItem_issue on Issues {\n  nodeId\n  id\n  title\n  status\n  priority\n  created_at\n  users {\n    name\n    avatar_url\n    nodeId\n  }\n  issue_labelsCollection(first: 5) {\n    edges {\n      node {\n        labels {\n          id\n          name\n          color\n          nodeId\n        }\n        nodeId\n      }\n    }\n  }\n}\n\nfragment IssueList_query_2q1J3d on Query {\n  issuesCollection(first: $first, after: $after, filter: {status: $statusFilter, priority: $priorityFilter}, orderBy: [{created_at: DescNullsLast}]) {\n    edges {\n      node {\n        nodeId\n        id\n        status\n        ...IssueListItem_issue\n        issue_labelsCollection(first: 5) {\n          edges {\n            node {\n              label_id\n              nodeId\n            }\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "53f56cd61171395942ca62f7e5a52793";

export default node;
