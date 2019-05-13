import React, {useState, useEffect} from 'react'
import AuthContext from './AuthContext'
import firebase from '../../utils/firebase'
import { client } from '../../utils/apollo-client'
import { user as userQuery } from '../../queries'

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

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

    const register = (values) => {
        if(typeof window !== "undefined") {
            return firebase.auth()
                    .createUserWithEmailAndPassword(values.email, values.password)
                    .then(userCredential => {
                        if (userCredential.user) {
                            const userCollection = firebase.firestore().collection('users')
                            return userCollection.add({
                                email: values.email,
                                firstName: values.firstName,
                                lastName: values.lastName,
                                role: "user",
                                uid: userCredential.user.uid
                            })
                        }
                    })
        }
    }

    if(typeof window !== "undefined") {
        firebase.auth().onIdTokenChanged(user => {
            if (user) {
                user.getIdToken().then(token => {
                    localStorage.setItem('userToken', token)
                    setToken(token)
                })

                client.query({
                    query: userQuery(user.uid)
                }).then(result => {
                    if(result.data.user){
                        setUserId(result.data.user.id)
                        localStorage.setItem('userId', result.data.user.id)
                    }
                })
            } else {
                localStorage.removeItem('userToken')
                setToken('')
                localStorage.removeItem('userId')
                setUserId('')
            }
        })
    }

    useEffect(() => {
        const token = localStorage.getItem('userToken')
        setToken(token)
        const userId = localStorage.getItem('userId')
        setUserId(userId)
    }, [])

    return (
        <AuthContext.Provider
            value={{
                token,
                userId,
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
