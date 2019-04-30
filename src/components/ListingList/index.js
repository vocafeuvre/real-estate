/* eslint-disable camelcase */
import React from 'react'
import {Card, Image, Label, Segment} from 'semantic-ui-react'
import {Link} from 'gatsby'

const mapListingsToItems = listings =>
  listings.map(
    ({name, id, price, priceUom, mainImage, isNew}) => {
      return {
        as: Link,
        to: `/listings/${id}/`,
        childKey: id,
        image: (
          <Image
            src={mainImage.src}
            fluid>
            {isNew ? (
              <Label color="red" ribbon style={{zIndex: '1'}}>
                New!
              </Label>
            ) : null}
          </Image>
        ),
        header: name,
        meta: <Card.Meta style={{color: 'dimgray'}}>{`${priceUom} ${price}`}</Card.Meta>,
      }
    },
  )

export default ({listings, loading}) => (
    <Segment basic loading={loading} style={{minHeight: "100px"}}>
        { loading ? 
            <></>  : 
            <Card.Group items={mapListingsToItems(listings)} itemsPerRow={2} stackable /> 
        }
    </Segment>
  
)
