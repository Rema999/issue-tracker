/** @type {import('relay-compiler').Config} */
module.exports = {
  src: './',
  schema: './schema.graphql',
  schemaConfig: {
    // pg_graphql implements the Relay Node interface using `nodeId` instead of `id`.
    // These settings tell the Relay compiler to use `nodeId` as the global object identifier
    // for cache normalization and as the variable name in generated refetch queries.
    nodeInterfaceIdField: 'nodeId',
    nodeInterfaceIdVariableName: 'nodeId',
  },
  language: 'typescript',
  // All generated artifacts go into a single directory for clarity.
  artifactDirectory: './__generated__',
  exclude: [
    '**/node_modules/**',
    '**/__generated__/**',
    '**/.next/**',
    '**/scripts/**',
    // Standalone .graphql files are treated as schema/extension files by relay-compiler.
    // Operation source definitions live in graphql/*.ts files instead.
    '**/graphql/*.graphql',
  ],
  // Emit ES modules — required for Next.js (webpack/turbopack) tree-shaking.
  eagerEsModules: true,
}
