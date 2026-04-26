/**
 * @generated SignedSource<<e521598221f2a98b2674b6e33a5c366c>>
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
export type IssueListPaginationQuery$variables = {
  after?: any | null | undefined;
  first?: number | null | undefined;
  priorityFilter?: StringFilter | null | undefined;
  statusFilter?: StringFilter | null | undefined;
};
export type IssueListPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"IssueList_query">;
};
export type IssueListPaginationQuery = {
  response: IssueListPaginationQuery$data;
  variables: IssueListPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": 20,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "priorityFilter"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "statusFilter"
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v3 = [
  (v1/*: any*/),
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
  (v2/*: any*/),
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeId",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueListPaginationQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/),
          (v2/*: any*/),
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
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IssueListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
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
                  (v4/*: any*/),
                  (v5/*: any*/),
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
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "avatar_url",
                        "storageKey": null
                      },
                      (v4/*: any*/)
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
                                "selections": [
                                  (v5/*: any*/),
                                  (v6/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "color",
                                    "storageKey": null
                                  },
                                  (v4/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v4/*: any*/),
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
        "args": (v3/*: any*/),
        "filters": [
          "filter",
          "orderBy"
        ],
        "handle": "connection",
        "key": "IssueList_issuesCollection",
        "kind": "LinkedHandle",
        "name": "issuesCollection"
      }
    ]
  },
  "params": {
    "cacheID": "651fbfde574adb71928afb06ee78a784",
    "id": null,
    "metadata": {},
    "name": "IssueListPaginationQuery",
    "operationKind": "query",
    "text": "query IssueListPaginationQuery(\n  $after: Cursor\n  $first: Int = 20\n  $priorityFilter: StringFilter\n  $statusFilter: StringFilter\n) {\n  ...IssueList_query_2q1J3d\n}\n\nfragment IssueListItem_issue on Issues {\n  nodeId\n  id\n  title\n  status\n  priority\n  created_at\n  users {\n    name\n    avatar_url\n    nodeId\n  }\n  issue_labelsCollection(first: 5) {\n    edges {\n      node {\n        labels {\n          id\n          name\n          color\n          nodeId\n        }\n        nodeId\n      }\n    }\n  }\n}\n\nfragment IssueList_query_2q1J3d on Query {\n  issuesCollection(first: $first, after: $after, filter: {status: $statusFilter, priority: $priorityFilter}, orderBy: [{created_at: DescNullsLast}]) {\n    edges {\n      node {\n        nodeId\n        id\n        status\n        ...IssueListItem_issue\n        issue_labelsCollection(first: 5) {\n          edges {\n            node {\n              label_id\n              nodeId\n            }\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ec9e70fb875b8811a86fb49611c98b62";

export default node;
