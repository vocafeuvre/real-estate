import React from "react"
import {graphql, useStaticQuery} from 'gatsby'
import get from 'lodash/get'
import ListingList from '../components/ListingList'
import SEO from '../components/SEO'
import Layout from '../components/Layout'

export default ({ location }) => {
    const data = useStaticQuery(graphql`
        query IndexQuery {
            site {
                siteMetadata {
                    title
                }
            }
            allListings {
                edges {
                    node {
                        id
                        name
                        description
                        location
                        isNew
                        price
                        referrer {
                            id
                            name
                        }
                        mainImageLink
                        mainImage {
                            childImageSharp {
                                sizes(maxWidth: 600) {
                                    ...GatsbyImageSharpSizes
                                }
                            }
                        }
                    }
                }
            }
        }
    `)

    const siteTitle = get(data, 'site.siteMetadata.title')
    const listings = get(data, 'allListings.edges')
    const getListingsWithImages = listings.filter(val => val.node.mainImageLink)

    return (
        <Layout location={location}>
            <SEO title={siteTitle} />
            <ListingList listings={getListingsWithImages} />
        </Layout>
    )
}
