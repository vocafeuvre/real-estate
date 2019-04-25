/* eslint-disable camelcase */
import React from 'react'
import {Card, Image, Label, Loader, Segment} from 'semantic-ui-react'
import Img from 'gatsby-image'
import {Link} from 'gatsby'

const mapListingsToItems = listings =>
  listings.map(
    ({name, id, price, mainImage}) => {
      return {
        as: Link,
        // to: `/listing/${id}/`,
        childKey: id,
        image: (
          <Image>
            {/* {isNew ? (
              <Label color="red" ribbon style={{zIndex: '1'}}>
                New!
              </Label>
            ) : null} */}
            <Img
              fluid={mainImage}
              alt={name}
            />
          </Image>
        ),
        header: name,
        meta: <Card.Meta style={{color: 'dimgray'}}>{price}</Card.Meta>,
      }
    },
  )

export default ({listings, loading}) => (
    <Segment>
        <Loader active={loading} />
        { loading ? <></> : <Card.Group items={mapListingsToItems(listings)} itemsPerRow={2} stackable /> }
    </Segment>
  
)
