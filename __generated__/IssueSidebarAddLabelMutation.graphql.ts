/**
 * @generated SignedSource<<ca119f6eaafdcbaf3e2fd37819924ed1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IssueSidebarAddLabelMutation$variables = {
  issueId: any;
  labelId: any;
};
export type IssueSidebarAddLabelMutation$data = {
  readonly insertIntoissue_labelsCollection: {
    readonly records: ReadonlyArray<{
      readonly issue_id: any;
      readonly label_id: any;
      readonly labels: {
        readonly color: string | null | undefined;
        readonly id: any;
        readonly name: string | null | undefined;
        readonly nodeId: string;
      } | null | undefined;
      readonly nodeId: string;
    }>;
  } | null | undefined;
};
export type IssueSidebarAddLabelMutation = {
  response: IssueSidebarAddLabelMutation$data;
  variables: IssueSidebarAddLabelMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "issueId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "labelId"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeId",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "items": [
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "issue_id",
                "variableName": "issueId"
              },
              {
                "kind": "Variable",
                "name": "label_id",
                "variableName": "labelId"
              }
            ],
            "kind": "ObjectValue",
            "name": "objects.0"
          }
        ],
        "kind": "ListValue",
        "name": "objects"
      }
    ],
    "concreteType": "IssueLabelsInsertResponse",
    "kind": "LinkedField",
    "name": "insertIntoissue_labelsCollection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "IssueLabels",
        "kind": "LinkedField",
        "name": "records",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "issue_id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "label_id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Labels",
            "kind": "LinkedField",
            "name": "labels",
            "plural": false,
            "selections": [
              (v1/*: any*/),
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
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "color",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueSidebarAddLabelMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IssueSidebarAddLabelMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "3d15af9ab40b36c42a6316c4633d95cd",
    "id": null,
    "metadata": {},
    "name": "IssueSidebarAddLabelMutation",
    "operationKind": "mutation",
    "text": "mutation IssueSidebarAddLabelMutation(\n  $issueId: UUID!\n  $labelId: UUID!\n) {\n  insertIntoissue_labelsCollection(objects: [{issue_id: $issueId, label_id: $labelId}]) {\n    records {\n      nodeId\n      issue_id\n      label_id\n      labels {\n        nodeId\n        id\n        name\n        color\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5ce58f2f6109301efb037e7ce6898c3f";

export default node;
