import React, { useState } from "react"
import { Segment } from "semantic-ui-react"
import { compose, withProps } from "recompose"
import {
    GoogleMap,
    Marker,
    withScriptjs,
    withGoogleMap,
} from "react-google-maps"
import { Button } from "semantic-ui-react"

const cebuLocation = { lat: 10.3157, lng: 123.8854 }
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
    <GoogleMap defaultZoom={15} defaultCenter={cebuLocation}>
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
    const [location, setLocation] = useState(cebuLocation)
    return (
        <>
            <Segment basic>
                <Map location={location} setLocation={setLocation} />
                <Button color="black">Save Location</Button>
            </Segment>
        </>
    )
}
