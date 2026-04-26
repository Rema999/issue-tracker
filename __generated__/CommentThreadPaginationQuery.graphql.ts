/**
 * @generated SignedSource<<814160a1416725511c2d5836fd8d8271>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommentThreadPaginationQuery$variables = {
  after?: any | null | undefined;
  first?: number | null | undefined;
  issueId: any;
};
export type CommentThreadPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CommentThread_query">;
};
export type CommentThreadPaginationQuery = {
  response: CommentThreadPaginationQuery$data;
  variables: CommentThreadPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": 10,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "issueId"
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
        "fields": [
          {
            "kind": "Variable",
            "name": "eq",
            "variableName": "issueId"
          }
        ],
        "kind": "ObjectValue",
        "name": "issue_id"
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
        "created_at": "AscNullsLast"
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CommentThreadPaginationQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "Variable",
            "name": "issueId",
            "variableName": "issueId"
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
    "name": "CommentThreadPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
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
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "body",
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
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
        "key": "CommentThread_commentsCollection",
        "kind": "LinkedHandle",
        "name": "commentsCollection"
      }
    ]
  },
  "params": {
    "cacheID": "f831c410da23baae985ac599fbae6078",
    "id": null,
    "metadata": {},
    "name": "CommentThreadPaginationQuery",
    "operationKind": "query",
    "text": "query CommentThreadPaginationQuery(\n  $after: Cursor\n  $first: Int = 10\n  $issueId: UUID!\n) {\n  ...CommentThread_query_3YjkUj\n}\n\nfragment CommentThread_comment on Comments {\n  nodeId\n  id\n  body\n  created_at\n  users {\n    name\n    avatar_url\n    nodeId\n  }\n}\n\nfragment CommentThread_query_3YjkUj on Query {\n  commentsCollection(filter: {issue_id: {eq: $issueId}}, first: $first, after: $after, orderBy: [{created_at: AscNullsLast}]) {\n    edges {\n      node {\n        nodeId\n        ...CommentThread_comment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b253b038091a60f0526b1e359dcd4030";

export default node;
