// /* eslint-disable */
// import React from 'react'
// import {graphql} from 'gatsby'
// import SEO from '../components/SEO'
// import get from 'lodash/get'
// import ListingSummary from '../components/ListingSummary'
// import ListingAttributes from '../components/ListingAttributes'
// import Layout from '../components/Layout'

// class ProductPageTemplate extends React.PureComponent {
//   render() {
//     const listingInfo = get(this, 'props.data.allListings')
//     const data = listingInfo.edges[0].node
//     const slug = data.slug
//     const image = get(data, 'mainImageLink')
//     const sizes = get(data, 'mainImage.childImageSharp.sizes')
//     const listing = {
//       ...data,
//       id: data.id,
//       image,
//       mainImage: data.mainImage,
//       header: data.name,
//       location: data.location,
//       description: data.description,
//       price: data.price,
//     }

//     if (!sizes) return null

//     return (
//       <Layout location={this.props.location}>
//         <SEO title={slug} />
//         <ListingSummary {...listing} />
//         <ListingAttributes {...listing} />
//       </Layout>
//     )
//   }
// }

// export default ListingPageTemplate

// export const pageQuery = graphql`
//   query ListingsQuery($id: String!) {
//     allListings(filter: {id: {eq: $id}}) {
//       edges {
//         node {
//           id
//           name
//           description
//           location
//           price
//           mainImageLink
//           mainImage {
//             childImageSharp {
//               sizes(maxWidth: 400) {
//                 ...GatsbyImageSharpSizes
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
