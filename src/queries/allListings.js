import { gql } from 'apollo-boost'

export default () => {
    return gql`
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
    `
}