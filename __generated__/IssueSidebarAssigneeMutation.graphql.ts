/**
 * @generated SignedSource<<2ad8f7ea67588b47246ae4ab463f5de1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IssueSidebarAssigneeMutation$variables = {
  assigneeId?: any | null | undefined;
  id: any;
};
export type IssueSidebarAssigneeMutation$data = {
  readonly updateissuesCollection: {
    readonly records: ReadonlyArray<{
      readonly assignee_id: any | null | undefined;
      readonly id: any;
      readonly nodeId: string;
      readonly users: {
        readonly avatar_url: string | null | undefined;
        readonly name: string | null | undefined;
        readonly nodeId: string;
      } | null | undefined;
    }>;
  };
};
export type IssueSidebarAssigneeMutation = {
  response: IssueSidebarAssigneeMutation$data;
  variables: IssueSidebarAssigneeMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "assigneeId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeId",
  "storageKey": null
},
v3 = [
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
            "name": "assignee_id",
            "variableName": "assigneeId"
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
          (v2/*: any*/),
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
              (v2/*: any*/),
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
              }
            ],
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueSidebarAssigneeMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "IssueSidebarAssigneeMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "8648ffbaccca5a0db6de29ce69f717e5",
    "id": null,
    "metadata": {},
    "name": "IssueSidebarAssigneeMutation",
    "operationKind": "mutation",
    "text": "mutation IssueSidebarAssigneeMutation(\n  $id: UUID!\n  $assigneeId: UUID\n) {\n  updateissuesCollection(filter: {id: {eq: $id}}, set: {assignee_id: $assigneeId}, atMost: 1) {\n    records {\n      nodeId\n      id\n      assignee_id\n      users {\n        nodeId\n        name\n        avatar_url\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e4e6ab79499921d50cd3f4bd90369a6c";

export default node;
