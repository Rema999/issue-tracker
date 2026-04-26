/**
 * @generated SignedSource<<90d735419015a7144dd54b395b0af6bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CommentFormMutation$variables = {
  body: string;
  issueId: any;
};
export type CommentFormMutation$data = {
  readonly insertIntocommentsCollection: {
    readonly records: ReadonlyArray<{
      readonly author_id: any | null | undefined;
      readonly body: string | null | undefined;
      readonly created_at: any | null | undefined;
      readonly id: any;
      readonly nodeId: string;
      readonly users: {
        readonly avatar_url: string | null | undefined;
        readonly name: string | null | undefined;
        readonly nodeId: string;
      } | null | undefined;
    }>;
  } | null | undefined;
};
export type CommentFormMutation = {
  response: CommentFormMutation$data;
  variables: CommentFormMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "body"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "issueId"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeId",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "items": [
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "body",
                "variableName": "body"
              },
              {
                "kind": "Variable",
                "name": "issue_id",
                "variableName": "issueId"
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
    "concreteType": "CommentsInsertResponse",
    "kind": "LinkedField",
    "name": "insertIntocommentsCollection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Comments",
        "kind": "LinkedField",
        "name": "records",
        "plural": true,
        "selections": [
          (v2/*: any*/),
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
            "kind": "ScalarField",
            "name": "author_id",
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
              (v2/*: any*/),
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
    "name": "CommentFormMutation",
    "selections": (v3/*: any*/),
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
    "name": "CommentFormMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "64fc978d0c1eccb0c50e258457fddbac",
    "id": null,
    "metadata": {},
    "name": "CommentFormMutation",
    "operationKind": "mutation",
    "text": "mutation CommentFormMutation(\n  $issueId: UUID!\n  $body: String!\n) {\n  insertIntocommentsCollection(objects: [{issue_id: $issueId, body: $body}]) {\n    records {\n      nodeId\n      id\n      body\n      created_at\n      author_id\n      users {\n        nodeId\n        name\n        avatar_url\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b839781040b9ddc20bb98efea90e0d86";

export default node;
