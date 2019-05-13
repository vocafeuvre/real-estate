/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-use-before-define */

import React, { useState, useContext } from "react"
import { navigate } from "gatsby"
import {
    Header,
    Form,
    Input,
    Button,
    Segment,
    Message,
} from "semantic-ui-react"
import SEO from "../components/SEO"
import AuthContext from "../components/Context/AuthContext"
import Layout from "../components/Layout"
import useForm from "../components/Hooks/useForm"

const Register = ({ location }) => {
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState([])
    const { register } = useContext(AuthContext)

    const formRegister = values => {
        setLoading(true)
        register(values)
            .then(() => {
				setLoading(false)
				navigate("/myaccount/")
            })
            .catch(e => {
                setLoading(false)
                setApiError(e.errors || e)
            })
    }

    const { values, handleChange, handleSubmit, errors } = useForm(
        formRegister,
        validate
    )

    const handleErrors = errors => {
        if (!Array.isArray(errors) && !errors.length > 0) {
            return (
                <Message
                    error
                    header="Sorry"
                    content="Cannot register at this time."
                />
            )
        }
        return errors.map(e => (
            <Message error header={e.title} content={e.detail} key={e.status} />
        ))
    }

    return (
        <Layout location={location}>
            <SEO title="Register" />
            <Header as="h1">Create an account</Header>
            <Form onSubmit={handleSubmit} loading={loading} error={!!errors}>
                {apiError.length !== 0 ? handleErrors(errors) : null}
                <Segment>
                    <Form.Field>
                        <label htmlFor="firstName">First Name</label>
                        <Input
                            id="firstName"
                            fluid
                            name="firstName"
                            autoFocus
                            onChange={handleChange}
                            value={values.firstName || ""}
                        />
                    </Form.Field>
                    {errors.firstName && (
                        <p style={{ color: "red" }}>{errors.firstName}</p>
                    )}

                    <Form.Field>
                        <label htmlFor="lastName">Last Name</label>
                        <Input
                            id="lastName"
                            fluid
                            name="lastName"
                            autoFocus
                            onChange={handleChange}
                            value={values.lastName || ""}
                        />
                    </Form.Field>
                    {errors.lastName && (
                        <p style={{ color: "red" }}>{errors.lastName}</p>
                    )}

                    <Form.Field>
                        <label htmlFor="email">Email</label>
                        <Input
                            id="email"
                            fluid
                            name="email"
                            type="email"
                            onChange={handleChange}
                            value={values.email || ""}
                        />
                    </Form.Field>
                    {errors.email && (
                        <p style={{ color: "red" }}>{errors.email}</p>
                    )}
                    <Form.Field>
                        <label htmlFor="password">Password</label>
                        <Input
                            id="password"
                            fluid
                            name="password"
                            type="password"
                            onChange={handleChange}
                            value={values.password || ""}
                        />
                    </Form.Field>
                    {errors.password && (
                        <p style={{ color: "red" }}>{errors.password}</p>
                    )}
                    <Button type="submit" color="orange">
                        Register
                    </Button>
                </Segment>
            </Form>
        </Layout>
    )
}

export default Register

const validate = values => {
    const errors = {}
    if (!values.email) {
        errors.email = "Email address is required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email address is invalid"
    }
    if (!values.password) {
        errors.password = "Password is required"
    }
    if (!values.firstName) {
        errors.firstName = "First name is required"
    }
    if (!values.lastName) {
        errors.lastName = "Last name is required"
    }
    return errors
}
