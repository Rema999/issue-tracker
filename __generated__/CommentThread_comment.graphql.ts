/**
 * @generated SignedSource<<0fe422c5ca3ab520842df110f9524910>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommentThread_comment$data = {
  readonly body: string | null | undefined;
  readonly created_at: any | null | undefined;
  readonly id: any;
  readonly nodeId: string;
  readonly users: {
    readonly avatar_url: string | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "CommentThread_comment";
};
export type CommentThread_comment$key = {
  readonly " $data"?: CommentThread_comment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommentThread_comment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommentThread_comment",
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
      "name": "body",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "created_at",
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
  "type": "Comments",
  "abstractKey": null
};

(node as any).hash = "fa68153751a997707cb94cebbff93f09";

export default node;
