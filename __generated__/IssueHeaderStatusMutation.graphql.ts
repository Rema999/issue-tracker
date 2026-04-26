/**
 * @generated SignedSource<<4bdd2ca30b3466ef8cb7691404a44818>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IssueHeaderStatusMutation$variables = {
  id: any;
  status: string;
};
export type IssueHeaderStatusMutation$data = {
  readonly updateissuesCollection: {
    readonly records: ReadonlyArray<{
      readonly id: any;
      readonly nodeId: string;
      readonly status: string | null | undefined;
    }>;
  };
};
export type IssueHeaderStatusMutation = {
  response: IssueHeaderStatusMutation$data;
  variables: IssueHeaderStatusMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "status"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "atMost",
        "value": 1
      },
      {
        "fields": [
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "eq",
                "variableName": "id"
              }
            ],
            "kind": "ObjectValue",
            "name": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "filter"
      },
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "status",
            "variableName": "status"
          }
        ],
        "kind": "ObjectValue",
        "name": "set"
      }
    ],
    "concreteType": "IssuesUpdateResponse",
    "kind": "LinkedField",
    "name": "updateissuesCollection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Issues",
        "kind": "LinkedField",
        "name": "records",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "nodeId",
            "storageKey": null
          },
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
            "name": "status",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueHeaderStatusMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IssueHeaderStatusMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ff2b937e23da914768e24f3662870951",
    "id": null,
    "metadata": {},
    "name": "IssueHeaderStatusMutation",
    "operationKind": "mutation",
    "text": "mutation IssueHeaderStatusMutation(\n  $id: UUID!\n  $status: String!\n) {\n  updateissuesCollection(filter: {id: {eq: $id}}, set: {status: $status}, atMost: 1) {\n    records {\n      nodeId\n      id\n      status\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0ac82d48fcc82319c6d5fbf83c3c7dd0";

export default node;
