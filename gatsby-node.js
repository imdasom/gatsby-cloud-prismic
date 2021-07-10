const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const queryResults = await graphql(`
    query JobListQuery {
      allPrismicJobDetail {
        nodes {
          uid
        }
      }
    }
  `);
  const jobPageTemplate = path.resolve(`src/pages/job.js`);
  queryResults.data.allPrismicJobDetail.nodes.forEach((node) => {
    createPage({
      path: `/job/${node.uid}`,
      component: jobPageTemplate,
      context: {
        uid: node.uid,
      },
    });
  });
};
