/**
 * @generated SignedSource<<fa3f757522d89b14aca29bcdbc6193e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IssueSidebarUsersQuery$variables = Record<PropertyKey, never>;
export type IssueSidebarUsersQuery$data = {
  readonly usersCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly avatar_url: string | null | undefined;
        readonly id: any;
        readonly name: string | null | undefined;
      };
    }>;
  } | null | undefined;
};
export type IssueSidebarUsersQuery = {
  response: IssueSidebarUsersQuery$data;
  variables: IssueSidebarUsersQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar_url",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueSidebarUsersQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "UsersConnection",
        "kind": "LinkedField",
        "name": "usersCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UsersEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Users",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "usersCollection(orderBy:[{\"name\":\"AscNullsLast\"}])"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "IssueSidebarUsersQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "UsersConnection",
        "kind": "LinkedField",
        "name": "usersCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UsersEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Users",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "nodeId",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "usersCollection(orderBy:[{\"name\":\"AscNullsLast\"}])"
      }
    ]
  },
  "params": {
    "cacheID": "579ba685ec28fd9ab70ef883ffa7459c",
    "id": null,
    "metadata": {},
    "name": "IssueSidebarUsersQuery",
    "operationKind": "query",
    "text": "query IssueSidebarUsersQuery {\n  usersCollection(orderBy: [{name: AscNullsLast}]) {\n    edges {\n      node {\n        id\n        name\n        avatar_url\n        nodeId\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7d3b0667d57272fc75e0243501164987";

export default node;
