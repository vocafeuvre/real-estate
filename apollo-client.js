import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'

export const client = new ApolloClient({
    uri: "https://us-central1-real-estate-238201.cloudfunctions.net/api/graphql",
    fetch
})