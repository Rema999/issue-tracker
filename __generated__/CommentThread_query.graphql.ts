/**
 * @generated SignedSource<<7635499057fbab3a7fa2c95deed22b9f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommentThread_query$data = {
  readonly commentsCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly nodeId: string;
        readonly " $fragmentSpreads": FragmentRefs<"CommentThread_comment">;
      };
    }>;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
    };
  } | null | undefined;
  readonly " $fragmentType": "CommentThread_query";
};
export type CommentThread_query$key = {
  readonly " $data"?: CommentThread_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommentThread_query">;
};

import CommentThreadPaginationQuery_graphql from './CommentThreadPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "commentsCollection"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "issueId"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": CommentThreadPaginationQuery_graphql
    }
  },
  "name": "CommentThread_query",
  "selections": [
    {
      "alias": "commentsCollection",
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
            }
          ],
          "kind": "ObjectValue",
          "name": "filter"
        },
        {
          "kind": "Literal",
          "name": "orderBy",
          "value": [
            {
              "created_at": "AscNullsLast"
            }
          ]
        }
      ],
      "concreteType": "CommentsConnection",
      "kind": "LinkedField",
      "name": "__CommentThread_commentsCollection_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommentsEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Comments",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "nodeId",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CommentThread_comment"
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
              "name": "hasNextPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "b253b038091a60f0526b1e359dcd4030";

export default node;
