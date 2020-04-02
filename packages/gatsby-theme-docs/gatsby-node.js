const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const withDefaults = require('./utils/default-options');
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
