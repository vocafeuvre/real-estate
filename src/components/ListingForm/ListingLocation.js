import React, { useEffect } from "react"
import { Segment, Button, Divider } from "semantic-ui-react"
import { compose, withProps } from "recompose"
import {
    GoogleMap,
    Marker,
    withScriptjs,
    withGoogleMap,
} from "react-google-maps"

const defaultLocation = { lat: 10.3157, lng: 123.8854 }
const myGoogleMapURL = `https://maps.googleapis.com/maps/api/js?key=${
    process.env.GATSBY_GOOGLE_MAP_KEY
}&v=3.exp&libraries=geometry,drawing,places`

const Map = compose(
    withProps({
        googleMapURL: myGoogleMapURL,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <Segment style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap defaultZoom={15} defaultCenter={props.location}>
        <Marker
            draggable
            position={props.location}
            onDragEnd={e => {
                props.setLocation({
                    lat: Number.parseFloat(e.latLng.lat().toFixed(4)),
                    lng: Number.parseFloat(e.latLng.lng().toFixed(4)),
                })
            }}
        />
    </GoogleMap>
))
export default props => {
    const { setListingLocation, listingLocation, previous, next } = props

    useEffect(() => {
        if (!(listingLocation.lat && listingLocation.lng)) {
            setListingLocation({
                lat: Number.parseFloat(defaultLocation.lat.toFixed(4)),
                lng: Number.parseFloat(defaultLocation.lng.toFixed(4)),
            })
        }
    }, [])

    return (
        <Segment basic>
            <Map
                location={
                    listingLocation.lat && listingLocation.lng
                        ? listingLocation
                        : defaultLocation
                }
                setLocation={setListingLocation}
            />
            <Divider hidden />
            <Button.Group>
                <Button secondary type="button" onClick={e => previous()}>
                    Back
                </Button>
                <Button primary type="button" onClick={e => next()}>
                    Next
                </Button>
            </Button.Group>
        </Segment>
    )
}
