import React from "react"
import get from "lodash/get"
import ListingAttributes from "../../components/ListingAttributes"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Message, Icon } from "semantic-ui-react"
import { Query } from "react-apollo"
import SEO from "../../components/SEO"
import Layout from "../../components/Layout"

import ListingForm from "../../components/ListingForm"
import UploadContext from "../../components/Context/UploadContext"

import { listingById } from "../../queries"
import ListingStoreContext from "../../components/Context/ListingStoreContext"
import AuthContext from "../../components/Context/AuthContext"

const MISSING_PAGE_ERROR =
    "This listing either does not exist, or is still being vetted by our site administrators. Please try again next time."

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

    const siteTitle = get(data, "site.siteMetadata.title")
    const listingId = location.pathname.split("/")[2]
    return (
        <Layout location={location}>
            <SEO title={siteTitle} />
            <Link to="/">
                <Icon name="caret left" />
                Go back to home
            </Link>
            {listingId === "add" ? (
                <AuthContext.Consumer>
                    {authContext => (
                        <ListingStoreContext.Consumer>
                            {listingStoreContext => (
                                <UploadContext.Consumer>
                                    {uploadContext => (
                                        <ListingForm
                                            token={authContext.token}
                                            userId={authContext.userId}
                                            deleteFile={
                                                uploadContext.deleteFile
                                            }
                                            publishListing={
                                                listingStoreContext.publishListing
                                            }
                                        />
                                    )}
                                </UploadContext.Consumer>
                            )}
                        </ListingStoreContext.Consumer>
                    )}
                </AuthContext.Consumer>
            ) : (
                <Query query={listingById(listingId)}>
                    {({ loading, error, data }) => {
                        if (error)
                            return (
                                <Message error content={MISSING_PAGE_ERROR} />
                            )
                        return (
                            <ListingAttributes
                                {...data.listing}
                                loading={loading}
                            />
                        )
                    }}
                </Query>
            )}
        </Layout>
    )
}

export default IndexPage
