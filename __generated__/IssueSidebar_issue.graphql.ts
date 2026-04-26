/**
 * @generated SignedSource<<3348b9cce759400d231eb77f92428dc0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IssueSidebar_issue$data = {
  readonly assignee_id: any | null | undefined;
  readonly id: any;
  readonly issue_labelsCollection: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly label_id: any;
        readonly labels: {
          readonly color: string | null | undefined;
          readonly id: any;
          readonly name: string | null | undefined;
          readonly nodeId: string;
        } | null | undefined;
        readonly nodeId: string;
      };
    }>;
  } | null | undefined;
  readonly nodeId: string;
  readonly users: {
    readonly avatar_url: string | null | undefined;
    readonly name: string | null | undefined;
    readonly nodeId: string;
  } | null | undefined;
  readonly " $fragmentType": "IssueSidebar_issue";
};
export type IssueSidebar_issue$key = {
  readonly " $data"?: IssueSidebar_issue$data;
  readonly " $fragmentSpreads": FragmentRefs<"IssueSidebar_issue">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeId",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "issue_labelsCollection"
        ]
      }
    ]
  },
  "name": "IssueSidebar_issue",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
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
        (v0/*: any*/),
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "avatar_url",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "issue_labelsCollection",
      "args": null,
      "concreteType": "IssueLabelsConnection",
      "kind": "LinkedField",
      "name": "__IssueSidebar_issue_labelsCollection_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "IssueLabelsEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "IssueLabels",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
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
                    (v0/*: any*/),
                    (v1/*: any*/),
                    (v2/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "color",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "kind": "ClientExtension",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__id",
              "storageKey": null
            }
          ]
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Issues",
  "abstractKey": null
};
})();

(node as any).hash = "fb21597da3f9600c8f95133d62c6e9c1";

export default node;
