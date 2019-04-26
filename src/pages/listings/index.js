import React from "react"
import get from 'lodash/get'
import ListingList from '../../components/ListingList'
import { useStaticQuery, graphql } from 'gatsby'
import { Message } from 'semantic-ui-react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo' 
import SEO from '../../components/SEO'
import Layout from '../../components/Layout'

const IndexPage = ({ location }) => {
    // const data = useStaticQuery(graphql`
    //     query {
    //         site {
    //             siteMetadata {
    //                 title
    //             }
    //         }
    //     }
    // `)

    const siteTitle = 'Real Estate Listing App' // get(data, 'site.siteMetadata.title')
    // const listings = get(data, 'allListings.edges')
    // const getListingsWithImages = listings.filter(val => val.node.mainImageLink)

    return (
        <Layout location={location}>
            <SEO title={siteTitle} />
            <Query
                query={gql`
                query {
                    listings {
                        id
                        name
                        description
                        price
                        priceUom
                        latitude
                        longitude
                        referrer {
                            id
                            email
                            firstName
                            lastName
                        }
                        mainImage {
                            src
                            width
                            height
                        }
                        images {
                            src
                            width
                            height
                        }
                    }
                }
                `}
            >
                {({ loading, error, data }) => {
                    if (error) return <Message error content={error.message} />
                    return <ListingList listings={data.listings} loading={loading} />
                }}
            </Query>
        </Layout>
    )
}

export default IndexPage