import React from "react"
import get from 'lodash/get'
import ListingList from '../components/ListingList'
import { useStaticQuery, graphql } from 'gatsby'
import { Message } from 'semantic-ui-react'
import { Query } from 'react-apollo' 
import SEO from '../components/SEO'
import Layout from '../components/Layout'

import { allListings } from '../queries'

export default ({ location }) => {
    const data = useStaticQuery(graphql`
        query IndexQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    const siteTitle = get(data, 'site.siteMetadata.title')
    // const listings = get(data, 'allListings.edges')
    // const getListingsWithImages = listings.filter(val => val.node.mainImageLink)

    return (
        <Layout location={location}>
            <SEO title={siteTitle} />
            <Query query={allListings()}>
                {({ loading, error, data }) => {
                    if (error) return <Message error content={error.message} />
                    return <ListingList listings={data.listings} loading={loading} />
                }}
            </Query>
        </Layout>
    )
}