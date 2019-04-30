import { gql } from 'apollo-boost'

export default uid => {
    return gql`
        query {
            user(uid: \"${uid}\") {
                id
                firstName
                lastName
                email
                role
            }
        }
    `
}