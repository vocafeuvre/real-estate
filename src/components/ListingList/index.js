/* eslint-disable camelcase */
import React from 'react'
import {Card, Image, Label} from 'semantic-ui-react'
import Img from 'gatsby-image'
import {Link} from 'gatsby'

const mapListingsToItems = listings =>
  listings.map(
    ({node: {name, id, price, mainImage, background_colour, new: isNew}}) => {
      const price = price
      return {
        as: Link,
        to: `/listing/${id}/`,
        childKey: id,
        image: (
          <Image>
            {isNew ? (
              <Label color="red" ribbon style={{zIndex: '1'}}>
                New!
              </Label>
            ) : null}
            <Img
              sizes={mainImage.childImageSharp.sizes}
              alt={name}
              style={{
                background: `${background_colour || '#fafafa'}`,
              }}
            />
          </Image>
        ),
        header: name,
        meta: <Card.Meta style={{color: 'dimgray'}}>{price}</Card.Meta>,
      }
    },
  )

export default ({listings}) => (
  <Card.Group items={mapListingsToItems(listings)} itemsPerRow={2} stackable />
)
