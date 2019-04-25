import React from 'react'
import AuthProvider from './src/components/Context/AuthProvider'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: "https://us-central1-real-estate-238201.cloudfunctions.net/api/graphql"
})

// eslint-disable-next-line import/prefer-default-export
export default ({ element }) => (
  <ApolloProvider client={client}>
    <AuthProvider>
      {element}
    </AuthProvider>
  </ApolloProvider>
)
