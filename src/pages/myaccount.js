import React, {useEffect, useContext} from 'react'
import {navigate} from 'gatsby'
import SEO from '../components/SEO'
// import ListingList from '../components/ListingList'
import Layout from '../components/Layout'
import AuthContext from '../components/Context/AuthContext'
import { Message } from 'semantic-ui-react'

const MyAccount = ({location}) => {
  // const [loading, setLoading] = useState(false)
  // const [listings, setListings] = useState([])
  const {token} = useContext(AuthContext)

  useEffect(() => {
    if (!token) {
      navigate('/login/')
    }
    // getListings(token)
    //   .then(({ data }) => {
    //     const listings = data.map(listing => ({
    //       ...listing,
    //     }))
    //     setLoading(false)
    //     setListings(listings)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }, [token])

  return (
    <Layout location={location}>
      <SEO title="My Account" />
      <Message>
        Under construction.
      </Message>
      {/* <ListingList
        listings={listings}
        loading={loading}
      /> */}
    </Layout>
  )
}
export default MyAccount
