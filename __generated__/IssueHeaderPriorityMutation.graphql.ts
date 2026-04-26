/**
 * @generated SignedSource<<48c87b13a2d7e709f194374f677505bb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IssueHeaderPriorityMutation$variables = {
  id: any;
  priority: string;
};
export type IssueHeaderPriorityMutation$data = {
  readonly updateissuesCollection: {
    readonly records: ReadonlyArray<{
      readonly id: any;
      readonly nodeId: string;
      readonly priority: string | null | undefined;
    }>;
  };
};
export type IssueHeaderPriorityMutation = {
  response: IssueHeaderPriorityMutation$data;
  variables: IssueHeaderPriorityMutation$variables;
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
    "name": "priority"
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
            "name": "priority",
            "variableName": "priority"
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
            "name": "priority",
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
    "name": "IssueHeaderPriorityMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IssueHeaderPriorityMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "78b7cffb04f0edbdd03ac086c0574b7a",
    "id": null,
    "metadata": {},
    "name": "IssueHeaderPriorityMutation",
    "operationKind": "mutation",
    "text": "mutation IssueHeaderPriorityMutation(\n  $id: UUID!\n  $priority: String!\n) {\n  updateissuesCollection(filter: {id: {eq: $id}}, set: {priority: $priority}, atMost: 1) {\n    records {\n      nodeId\n      id\n      priority\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "78db5398476c73f48a53ff7adddb5080";

export default node;
