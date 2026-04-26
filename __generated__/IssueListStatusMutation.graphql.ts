/**
 * @generated SignedSource<<b6105dcbe6995cce3501b892c4278886>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IssueListStatusMutation$variables = {
  id: any;
  status: string;
};
export type IssueListStatusMutation$data = {
  readonly updateissuesCollection: {
    readonly records: ReadonlyArray<{
      readonly id: any;
      readonly nodeId: string;
      readonly status: string | null | undefined;
    }>;
  };
};
export type IssueListStatusMutation = {
  response: IssueListStatusMutation$data;
  variables: IssueListStatusMutation$variables;
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
    "name": "IssueListStatusMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IssueListStatusMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7c400066a76a794b4d672a802d8c6649",
    "id": null,
    "metadata": {},
    "name": "IssueListStatusMutation",
    "operationKind": "mutation",
    "text": "mutation IssueListStatusMutation(\n  $id: UUID!\n  $status: String!\n) {\n  updateissuesCollection(filter: {id: {eq: $id}}, set: {status: $status}, atMost: 1) {\n    records {\n      nodeId\n      id\n      status\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "336a8de44866123cb0bfa95bf1bb293a";

export default node;
