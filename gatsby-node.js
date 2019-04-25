const Promise = require('bluebird')
const path = require('path')

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions

//   return new Promise((resolve, reject) => {
//     const listingPageTemplate = path.resolve('src/templates/ListingPage.js')
//     resolve(
//       graphql(
//         `
//           {
//             allListings {
//               edges {
//                 node {
//                   id
//                 }
//               }
//             }
//           }
//         `
//       ).then(result => {
//         if (result.errors) {
//           console.log(result.errors)
//           reject(result.errors)
//         }
//         result.data.allListings.edges.forEach(edge => {
//           createPage({
//             path: `/listing/${edge.node.id}/`,
//             component: listingPageTemplate,
//             context: {
//               id: edge.node.id,
//             },
//           })
//         })
//       })
//     )
//   })
// }

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: { fs: 'empty' },
  })
}
