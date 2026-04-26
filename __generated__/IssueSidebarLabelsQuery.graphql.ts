/**
 * @generated SignedSource<<5c9297e32acc0dafda86d0d79bd21708>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IssueSidebarLabelsQuery$variables = Record<PropertyKey, never>;
export type IssueSidebarLabelsQuery$data = {
  readonly labelsCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly color: string | null | undefined;
        readonly id: any;
        readonly name: string | null | undefined;
      };
    }>;
  } | null | undefined;
};
export type IssueSidebarLabelsQuery = {
  response: IssueSidebarLabelsQuery$data;
  variables: IssueSidebarLabelsQuery$variables;
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
  "name": "color",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueSidebarLabelsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
        "storageKey": "labelsCollection(orderBy:[{\"name\":\"AscNullsLast\"}])"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "IssueSidebarLabelsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
        "storageKey": "labelsCollection(orderBy:[{\"name\":\"AscNullsLast\"}])"
      }
    ]
  },
  "params": {
    "cacheID": "005014466dec8146a7aa1fe90a6ffd4c",
    "id": null,
    "metadata": {},
    "name": "IssueSidebarLabelsQuery",
    "operationKind": "query",
    "text": "query IssueSidebarLabelsQuery {\n  labelsCollection(orderBy: [{name: AscNullsLast}]) {\n    edges {\n      node {\n        id\n        name\n        color\n        nodeId\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e3139606255b929e399e406228b8c451";

export default node;
