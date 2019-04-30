import { gql } from 'apollo-boost'

export default id => {
    return gql`
        query {
            listingsByReferrer(referrer: \"${id}\") {
                id
                name
                description
                address
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
    `
}