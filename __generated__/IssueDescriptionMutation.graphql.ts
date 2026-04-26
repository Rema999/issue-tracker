/**
 * @generated SignedSource<<5c79f110747d1c4dd48c9dee3b71c65f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IssueDescriptionMutation$variables = {
  description: string;
  id: any;
};
export type IssueDescriptionMutation$data = {
  readonly updateissuesCollection: {
    readonly records: ReadonlyArray<{
      readonly description: string | null | undefined;
      readonly id: any;
      readonly nodeId: string;
    }>;
  };
};
export type IssueDescriptionMutation = {
  response: IssueDescriptionMutation$data;
  variables: IssueDescriptionMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "description"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
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
            "name": "description",
            "variableName": "description"
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
            "name": "description",
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
    "name": "IssueDescriptionMutation",
    "selections": (v2/*: any*/),
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
    "name": "IssueDescriptionMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "9df5f6a93cf3f68a3ecc0a9d99214467",
    "id": null,
    "metadata": {},
    "name": "IssueDescriptionMutation",
    "operationKind": "mutation",
    "text": "mutation IssueDescriptionMutation(\n  $id: UUID!\n  $description: String!\n) {\n  updateissuesCollection(filter: {id: {eq: $id}}, set: {description: $description}, atMost: 1) {\n    records {\n      nodeId\n      id\n      description\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ef4a4b0813f4d202fbcad5694a55dd75";

export default node;
