/**
 * @generated SignedSource<<745a5aa4b67862731a0ed8dbcc226681>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IssueHeaderTitleMutation$variables = {
  id: any;
  title: string;
};
export type IssueHeaderTitleMutation$data = {
  readonly updateissuesCollection: {
    readonly records: ReadonlyArray<{
      readonly id: any;
      readonly nodeId: string;
      readonly title: string | null | undefined;
    }>;
  };
};
export type IssueHeaderTitleMutation = {
  response: IssueHeaderTitleMutation$data;
  variables: IssueHeaderTitleMutation$variables;
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
    "name": "title"
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
            "name": "title",
            "variableName": "title"
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
            "name": "title",
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
    "name": "IssueHeaderTitleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IssueHeaderTitleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "836689049d2dc482b62debb454169c16",
    "id": null,
    "metadata": {},
    "name": "IssueHeaderTitleMutation",
    "operationKind": "mutation",
    "text": "mutation IssueHeaderTitleMutation(\n  $id: UUID!\n  $title: String!\n) {\n  updateissuesCollection(filter: {id: {eq: $id}}, set: {title: $title}, atMost: 1) {\n    records {\n      nodeId\n      id\n      title\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3bec94bc1df1a46ec42bf559f9d5215f";

export default node;
