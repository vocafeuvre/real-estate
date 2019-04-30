import React from "react"
import get from 'lodash/get'
import ListingAttributes from '../../components/ListingAttributes'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Message, Icon } from 'semantic-ui-react'
import { Query } from 'react-apollo' 
import SEO from '../../components/SEO'
import Layout from '../../components/Layout'

import { listingById } from '../../queries'

const IndexPage = ({ location }) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    const siteTitle = get(data, 'site.siteMetadata.title')
    const listingId = location.pathname.split("/")[2]
    return (
        <Layout location={location}>
            <SEO title={siteTitle} />
            <Link to="/">
                <Icon name="caret left" />
                Go back to home
            </Link>
            <Query query={listingById(listingId)}>
                {({ loading, error, data }) => {
                    if (error) return <Message error content={error.message} />
                    return <ListingAttributes {...data.listing} loading={loading}/>
                }}
            </Query>
        </Layout>
    )
}

export default IndexPage