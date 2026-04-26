/**
 * @generated SignedSource<<0f8e0e19f6542843dae1ac0b3aec1660>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IssueSidebarRemoveLabelMutation$variables = {
  issueId: any;
  labelId: any;
};
export type IssueSidebarRemoveLabelMutation$data = {
  readonly deleteFromissue_labelsCollection: {
    readonly records: ReadonlyArray<{
      readonly nodeId: string;
    }>;
  } | null | undefined;
};
export type IssueSidebarRemoveLabelMutation = {
  response: IssueSidebarRemoveLabelMutation$data;
  variables: IssueSidebarRemoveLabelMutation$variables;
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
v1 = [
  {
    "alias": null,
    "args": [
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
          },
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "eq",
                "variableName": "labelId"
              }
            ],
            "kind": "ObjectValue",
            "name": "label_id"
          }
        ],
        "kind": "ObjectValue",
        "name": "filter"
      }
    ],
    "concreteType": "IssueLabelsDeleteResponse",
    "kind": "LinkedField",
    "name": "deleteFromissue_labelsCollection",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueSidebarRemoveLabelMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IssueSidebarRemoveLabelMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bd964342d48f59ffa1b9913589a09969",
    "id": null,
    "metadata": {},
    "name": "IssueSidebarRemoveLabelMutation",
    "operationKind": "mutation",
    "text": "mutation IssueSidebarRemoveLabelMutation(\n  $issueId: UUID!\n  $labelId: UUID!\n) {\n  deleteFromissue_labelsCollection(filter: {issue_id: {eq: $issueId}, label_id: {eq: $labelId}}) {\n    records {\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e9712072174411356b8917cc5b599875";

export default node;
