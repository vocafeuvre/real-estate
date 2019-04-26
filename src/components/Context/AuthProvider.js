import React, {useState, useEffect} from 'react'
import AuthContext from './AuthContext'
import firebase from '../../utils/firebase'

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null)

    const signOut = () => {
        if(typeof window !== "undefined") {
            firebase.auth().signOut().catch(e => {
            console.log(e.message)
            })
        }
    }

    const signIn = (email, password) => {
        if(typeof window !== "undefined") {
            return firebase.auth()
                    .signInWithEmailAndPassword(email, password)
        }
    }

    const register = (email, password) => {
        if(typeof window !== "undefined") {
            return firebase.auth()
                    .createUserWithEmailAndPassword(email, password)
        }
    }

    if(typeof window !== "undefined") {
        firebase.auth().onIdTokenChanged(user => {
            if (user) {
                user.getIdToken().then(token => {
                    localStorage.setItem('userToken', token)
                    setToken(token)
                })
            } else {
                localStorage.removeItem('userToken')
                setToken('')
            }
        })
    }

    useEffect(() => {
        const token = localStorage.getItem('userToken')
        setToken(token)
    }, [])

    return (
        <AuthContext.Provider
            value={{
                token,
                register,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
