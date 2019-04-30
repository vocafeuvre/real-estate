import React from 'react'

const AuthContext = React.createContext({
    token: '', 
    userId: '',
    register: (email, password) => {},
    signIn: (email, password) => {},
    signOut: () => {}
})

export default AuthContext
