import React from "react"
import {
    Form,
    Segment,
    Input,
    TextArea,
    Button,
    Divider,
} from "semantic-ui-react"

export default props => {
    const { setListingInfo, validateListingInfo, listingInfoErrors, listingInfo, next } = props

    const handleChange = event => {
        event.persist()
        
        let value = event.target.value

        if (event.target.name === 'price') {
            value = Number.parseFloat(value).toFixed(2)
        }

        if (event.target.name === 'priceUom') {
            value = event.target.value.toString().toUpperCase()
        }

        setListingInfo({
            [event.target.name]: value
        })
    }

    return (
        <Form error={Object.entries(listingInfoErrors).length !== 0}>
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
                        value={listingInfo.listingName || ""}
                    />
                </Form.Field>
                {listingInfoErrors.listingName && (
                    <p data-testid="error" style={{ color: "red" }}>
                        {listingInfoErrors.listingName}
                    </p>
                )}
                <Form.Field required>
                    <label htmlFor="description">Description</label>
                    <TextArea
                        id="description"
                        rows={2}
                        name="description"
                        value={listingInfo.description || ""}
                        onChange={handleChange}
                    />
                </Form.Field>
                {listingInfoErrors.description && (
                    <p style={{ color: "red" }}>{listingInfoErrors.description}</p>
                )}
                <Form.Group>
                    <Form.Field required width={6}>
                        <label htmlFor="priceUom">Currency</label>
                        <Input
                            id="priceUom"
                            fluid
                            name="priceUom"
                            maxLength={3}
                            value={listingInfo.priceUom || ""}
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field required width={10}>
                        <label htmlFor="price">Price</label>
                        <Input
                            id="price"
                            fluid
                            name="price"
                            maxLength={15}
                            value={listingInfo.price || ""}
                            onChange={handleChange}
                        />
                    </Form.Field>
                </Form.Group>
                {listingInfoErrors.price && <p style={{ color: "red" }}>{listingInfoErrors.price}</p>}
                {listingInfoErrors.priceUom && <p style={{ color: "red" }}>{listingInfoErrors.priceUom}</p>}
                <Form.Field required>
                    <label htmlFor="address">Address</label>
                    <Input
                        id="address"
                        fluid
                        name="address"
                        value={listingInfo.address || ""}
                        onChange={handleChange}
                    />
                </Form.Field>
                {listingInfoErrors.address && (
                    <p style={{ color: "red" }}>{listingInfoErrors.address}</p>
                )}
                <Divider hidden />
                <Button.Group>
                    <Button primary type="button" onClick={e => {
                        const canProceed = validateListingInfo()

                        if (canProceed) {
                            next()
                        }
                    }}>Next</Button>
                </Button.Group>
            </Segment>
        </Form>
    )
}
