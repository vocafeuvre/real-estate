import React from 'react'

const AuthContext = React.createContext({
    token: '', 
    register: (email, password) => {},
    signIn: (email, password) => {},
    signOut: () => {}
})

export default AuthContext
