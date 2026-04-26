/**
 * @generated SignedSource<<ff989d08efd06fe2ed23f88d9e590d69>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IssueHeader_issue$data = {
  readonly created_at: any | null | undefined;
  readonly id: any;
  readonly nodeId: string;
  readonly priority: string | null | undefined;
  readonly status: string | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "IssueHeader_issue";
};
export type IssueHeader_issue$key = {
  readonly " $data"?: IssueHeader_issue$data;
  readonly " $fragmentSpreads": FragmentRefs<"IssueHeader_issue">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IssueHeader_issue",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priority",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "created_at",
      "storageKey": null
    }
  ],
  "type": "Issues",
  "abstractKey": null
};

(node as any).hash = "9678ee397f134f209b3e388cfdfb6f2d";

export default node;
