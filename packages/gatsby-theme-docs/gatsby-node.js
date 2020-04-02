const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const withDefaults = require('./utils/default-options');

// onPreBootStrap -> Before starting App
exports.onPreBootstrap = ({ store }, options) => {
  const { program } = store.getState();
  // TODO get options with defaults
  const { contentPath } = withDefaults(options);
  // TODO figure out the content path
  const dir = path.join(program.directory, contentPath);
  // TODO if directory doesn't exit, create it
  if (!fs.existsSync(dir)) {
    // TODO create the dir
    // we are using a library so that user can create multi level directory
    mkdirp.sync(dir);
  }
};

// createSchemaCustomization -> Create Schema in GraphQL
exports.createSchemaCustomization = ({ actions }) => {
  // TODO it will create these nodes under allDocsPage >> nodes >> id, title, path, updated, body
  actions.createTypes(`
    type DocsPage implements Node @dontInfer {
        id: ID!
        title: String!
        path: String!
        updated: Date! @dateformat
        body: String!
    }
    `);
};
// onCreateNode -> in the time of creating Node
exports.onCreateNode = ({ node, actions, getNode, createNodeId }, options) => {
  const { basePath } = withDefaults(options);
  const parent = getNode(node.parent);

  // Only work in MDX files that were loaded by this theme
  if (
    node.internal.type !== 'Mdx' ||
    parent.sourceInstanceName !== 'gatsby-theme-docs'
  ) {
    return;
  }

  // Treat `index.mdx` link `index.html` (i.e `docs/` vs. `docs/index/`)
  const pageName = parent.name !== 'index' ? parent.name : '';

  actions.createNode({
    id: createNodeId(`DocsPage-${node.id}`),
    title: node.frontmatter.title || parent.name,
    updated: parent.modifiedTime,
    path: path.join('/', basePath, parent.relativeDirectory, pageName),
    parent: node.id,
    internal: {
      type: 'DocsPage',
      contentDigest: node.internal.contentDigest,
    },
  });
};

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    DocsPage: {
      body: {
        type: 'String!',
        resolve: (source, args, context, info) => {
          // Load the resolver for the `Mdx` type `body` field.
          const type = info.schema.getType('Mdx');
          const mdxFields = type.getFields();
          const resolver = mdxFields.body.resolve;
          const mdxNode = context.nodeModel.getNodeById({ id: source.parent });

          return resolver(mdxNode, args, context, {
            fieldName: 'body',
          });
        },
      },
    },
  });
};
