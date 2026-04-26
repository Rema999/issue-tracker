/**
 * @generated SignedSource<<b3985be1ae01df51f6d84a852b2388a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IssueDescription_issue$data = {
  readonly description: string | null | undefined;
  readonly id: any;
  readonly nodeId: string;
  readonly " $fragmentType": "IssueDescription_issue";
};
export type IssueDescription_issue$key = {
  readonly " $data"?: IssueDescription_issue$data;
  readonly " $fragmentSpreads": FragmentRefs<"IssueDescription_issue">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IssueDescription_issue",
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
  "type": "Issues",
  "abstractKey": null
};

(node as any).hash = "9cd2f01ac54aac9be9a553bcf90f4345";

export default node;
