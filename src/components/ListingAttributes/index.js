/* eslint-disable camelcase */
import React from 'react'
import {Header, Divider, Table, Label, Segment, Image} from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react'
import ImageCarousel from '../ImageCarousel'

const MapMarker = ({text}) => (
  <Label pointing="below" color="red">
    {text}
  </Label>
)

export default ({name, description, latitude, longitude, address, priceUom, price, referrer, mainImage, images, loading}) => (
  <Segment basic loading={loading} style={{minHeight: "300px"}}>
    { loading ? null :
      (
        <>
          <Image fluid rounded src={mainImage.src} />
          <Header as="h1">{name}</Header>
          <Divider />
          <p>{description}</p>

          <Divider hidden/>
          <Table celled>
            <Table.Header style={{background: '#f9fafb'}}>
              <Table.Row>
                <Table.HeaderCell colSpan="2">Listing Information</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Address</Table.Cell>
                <Table.Cell>{address}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Price</Table.Cell>
                <Table.Cell>{`${priceUom} ${price}`}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Referred by</Table.Cell>
                <Table.Cell>{`${referrer.firstName} ${referrer.lastName}`}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          {
            latitude && longitude
            ? <>
                <Divider hidden/>
                <Header as="h3">Location</Header>
                <Divider />
                <Segment style={{height: "400px", width: "100%"}}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_MAP_KEY }}
                    defaultCenter={[latitude, longitude]}
                    defaultZoom={15}
                  >
                    <MapMarker lat={latitude} lng={longitude} text="I'm here!"/>
                  </GoogleMapReact>
                </Segment>
              </>
            : null
          }

          { 
            images.length === 0 
            ? null 
            : <>
                <Divider hidden/>
                <Header as="h3">More Images</Header>
                <Divider />
                <ImageCarousel images={images} /> 
              </>
          }
        </>
      )
    }
  </Segment>
)
