import React from 'react'
import AuthProvider from './src/components/Context/AuthProvider'

// eslint-disable-next-line import/prefer-default-export
export default ({ element }) => (
  <AuthProvider>{element}</AuthProvider>
)
