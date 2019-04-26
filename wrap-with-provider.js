import React from 'react'
import AuthProvider from './src/components/Context/AuthProvider'
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo-client'

// eslint-disable-next-line import/prefer-default-export
export default ({ element }) => (
  <ApolloProvider client={client}>
    <AuthProvider>
      {element}
    </AuthProvider>
  </ApolloProvider>
)
