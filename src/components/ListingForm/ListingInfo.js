import React, { useState, useContext } from 'react'
import { Form, Segment, Button, Message, Input, TextArea } from 'semantic-ui-react'
import useForm from '../../components/Hooks/useForm'
import { isNumber } from 'util';

const validate = values => {
    const errors = {}

    if (!values.listingName) {
        errors.listingName = 'Listing Name is required'
    }

    const descCharLimit = 300
    if (!values.description) {
        errors.description = 'Description is required'
    } else if (values.description.length > descCharLimit) {
        errors.description = `Character limit is at ${descCharLimit}`
    }
    
    const addressCharLimit = 100
    if (!values.address) {
        errors.address = 'Address is required'
    } else if (values.address.length > addressCharLimit) {
        errors.address = `Character limit is at ${addressCharLimit}`
    }
    
    const priceUomCharLimit = 3
    if (!values.priceUom) {
        errors.priceUom = 'Currency is required'
    } else if (values.priceUom.length > descCharLimit) {
        errors.priceUom = `Character limit is at ${priceUomCharLimit}. Ex: USD`
    }

    if (!values.price) {
        errors.price = 'Price is required'
    } else if (isNumber(values.price)) {
        errors.price = 'Price should be a number'
    }

    return errors
}


export default props => {
    const [loading, setLoading] = useState(false)
    const [apiErrors, setApiErrors] = useState([])

    const formSubmit = values => {
        props.saveInfo(values)
    }

    const {values, handleChange, handleSubmit, errors} = useForm(
        formSubmit,
        validate,
    )

    const handleErrors = errors => {
      if (!Array.isArray(errors) && !errors.length > 0) {
        return (
          <Message error header="Sorry" content="Cannot submit a listing at this time." />
        )
      }
      return errors.map(e => (
        <Message error header={e.title} content={e.detail} key={e.status} />
      ))
    }

    return (
        <Form
            onSubmit={handleSubmit}
            loading={loading}
            error={Object.entries(errors).length !== 0}
        >
            {apiErrors.length !== 0 ? handleErrors(apiErrors) : null}
            <Segment basic>
                <Form.Field required>
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
                <Form.Field required>
                    <label htmlFor="description">Description</label>
                    <TextArea
                        id="description"
                        rows={2}
                        name="description"
                        value={values.description || ''}
                        onChange={handleChange}
                    />
                </Form.Field>
                {errors.description && <p style={{color: 'red'}}>{errors.description}</p>}
                <Form.Group>
                    <Form.Field required width={6}>
                        <label htmlFor="priceUom">Currency</label>
                        <Input
                            id="priceUom"
                            fluid
                            name="priceUom"
                            value={values.priceUom || ''}
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field required width={10}>
                        <label htmlFor="price">Price</label>
                        <Input
                            id="price"
                            fluid
                            name="price"
                            value={values.price || ''}
                            onChange={handleChange}
                        />
                    </Form.Field>
                </Form.Group>
                {errors.price && <p style={{color: 'red'}}>{errors.price}</p>}
                <Form.Field required>
                    <label htmlFor="address">Address</label>
                    <Input
                        id="address"
                        fluid
                        name="address"
                        value={values.address || ''}
                        onChange={handleChange}
                    />
                </Form.Field>
                {errors.address && <p style={{color: 'red'}}>{errors.address}</p>}
                <Button type="submit" color="black">
                    Save Listing Info
                </Button>
            </Segment>
        </Form>
    )
}