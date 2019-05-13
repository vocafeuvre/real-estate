import React, { useEffect, useContext } from "react"
import { navigate } from "gatsby"
import SEO from "../components/SEO"
import ListingList from "../components/ListingList"
import { Query } from "react-apollo"
import Layout from "../components/Layout"
import AuthContext from "../components/Context/AuthContext"
import { Message } from "semantic-ui-react"
import { listingsByReferrer } from "../queries"

const MyAccount = ({ location }) => {
    const { token, userId } = useContext(AuthContext)

    useEffect(() => {
        // if still not works, use the local storage to make sure we dont do the redirect
        if (!token) {
            navigate("/login/")
        }
    }, [token])

    return (
        <Layout location={location}>
            <SEO title="My Account" />
            <Query query={listingsByReferrer(userId)}>
                {({ loading, error, data }) => {
                    if (error) return <Message error content={error.message} />

					return (
						<ListingList
							listings={data.listingsByReferrer}
							loading={loading}
						/>
					)}
                }
            </Query>
        </Layout>
    )
}
export default MyAccount
