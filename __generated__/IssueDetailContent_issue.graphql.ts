/**
 * @generated SignedSource<<0e5c488d3f763f4a0ed8963437e66919>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IssueDetailContent_issue$data = {
  readonly id: any;
  readonly nodeId: string;
  readonly title: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"IssueDescription_issue" | "IssueHeader_issue" | "IssueSidebar_issue">;
  readonly " $fragmentType": "IssueDetailContent_issue";
};
export type IssueDetailContent_issue$key = {
  readonly " $data"?: IssueDetailContent_issue$data;
  readonly " $fragmentSpreads": FragmentRefs<"IssueDetailContent_issue">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IssueDetailContent_issue",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "IssueHeader_issue"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "IssueDescription_issue"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "IssueSidebar_issue"
    }
  ],
  "type": "Issues",
  "abstractKey": null
};

(node as any).hash = "60ff6f76044875d2260bfa3c3bcfdcd4";

export default node;
