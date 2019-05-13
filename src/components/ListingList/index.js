/* eslint-disable camelcase */
import React from "react"
import { Card, Image, Label, Segment, Message } from "semantic-ui-react"
import { Link } from "gatsby"

const NO_LISTINGS_YET = "You haven't created any listings yet."

const mapListingsToItems = listings =>
    listings.map(({ name, id, price, priceUom, mainImage, isNew }) => {
        return {
            as: Link,
            to: `/listings/${id}/`,
            childKey: id,
            image: (
                <Image src={mainImage.src} fluid>
                    {isNew ? (
                        <Label color="red" ribbon style={{ zIndex: "1" }}>
                            New!
                        </Label>
                    ) : null}
                </Image>
            ),
            header: name,
            meta: (
                <Card.Meta style={{ color: "dimgray" }}>{`${priceUom} ${Number(
                    price
                )
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}</Card.Meta>
            ),
        }
    })

export default ({ listings, loading }) => {
    return (
        <Segment basic loading={loading} style={{ minHeight: "100px" }}>
            {loading ? (
                <></>
            ) : listings ? (
                <Card.Group
                    items={mapListingsToItems(listings)}
                    itemsPerRow={2}
                    stackable
                />
            ) : (
                <Message info>
                    <Message.Header>No Listings Yet</Message.Header>
                    {NO_LISTINGS_YET}
                </Message>
            )}
        </Segment>
    )
}
