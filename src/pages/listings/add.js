import React, { useState, useContext } from 'react'
import {navigate} from 'gatsby'
import {Header, Form, Input, Button, Segment, Message} from 'semantic-ui-react'
import SEO from '../../components/SEO'
import AuthContext from '../../components/Context/AuthContext'
import Layout from '../../components/Layout'
import useForm from '../../components/Hooks/useForm'

const AddPage = ({ location }) => {
    const [loading, setLoading] = useState(false)
    // const [apiError, setApiError] = useState([])
    // const { user } = useContext(AuthContext)

    const formLogin = () => {
        setLoading(true)
        navigate('/')

        // add submit logic here
    }
    const {values, handleChange, handleSubmit, errors} = useForm(
        formLogin,
        validate,
    )

    const handleErrors = errors => {
        if (!Array.isArray(errors) && !errors.length > 0) {
        return (
            <Message
            error
            header="Sorry"
            content="Please check your login details and try again."
            />
        )
        }
        return errors.map(e => (
        <Message error header={e.title} content={e.detail} key={e.status} />
        ))
    }
    return (
        <Layout location={location}>
            <SEO title="Login" />
            <Header as="h1">Share a Listing</Header>
            <Form
                onSubmit={handleSubmit}
                loading={loading}
                // error={apiError.length !== 0 || Object.entries(errors).length !== 0}
            >
                {/* {apiError.length !== 0 ? handleErrors(errors) : null} */}
                <Segment>
                    <Form.Field>
                        <label htmlFor="listingName">Name of Listing</label>
                        <Input
                        id="listingName"
                        fluid
                        name="listingName"
                        type="text"
                        autoFocus
                        onChange={handleChange}
                        value={values.listingName || ''}
                        />
                    </Form.Field>
                    {errors.listingName && (
                        <p data-testid="error" style={{color: 'red'}}>
                        {errors.listingName}
                        </p>
                    )}
                    <Form.Field>
                        <label htmlFor="description">Description</label>
                        <Input
                        id="description"
                        fluid
                        name="description"
                        type="text"
                        value={values.description || ''}
                        onChange={handleChange}
                        />
                    </Form.Field>
                    {errors.description && <p style={{color: 'red'}}>{errors.description}</p>}
                    <Form.Field>
                        <label htmlFor="price">Price</label>
                        <Input
                        id="price"
                        fluid
                        name="price"
                        type="text"
                        value={values.price || ''}
                        onChange={handleChange}
                        />
                    </Form.Field>
                    {errors.price && <p style={{color: 'red'}}>{errors.price}</p>}
                    <Button type="submit" color="orange">
                        Share Listing
                    </Button>
                </Segment>
            </Form>
        </Layout>
    )
}

export default AddPage;

const validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Email address is required'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid'
    }
    if (!values.password) {
      errors.password = 'Password is required'
    }
    return errors
  }
  