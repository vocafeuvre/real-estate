import React, { useState, useEffect } from "react"
import {
    Segment,
    Header,
    Divider,
    Label,
    Image,
    Message,
} from "semantic-ui-react"

import ImageUpload from "./ImageUpload"

export default () => {
    const [mainImage, setMainImage] = useState(null)
    const [mainImageSrc, setMainImageSrc] = useState(null)
    const [mainImageIndex, setMainImageIndex] = useState(null)
    const [loading, setLoading] = useState(false)

    const saveMainImage = image => {
        let reader = new FileReader()
        reader.onload = async e => {
            console.log("loading " + image.name + " " + image.id)
            let imageSrc = e.target.result

            await setMainImage(image)
            await setMainImageSrc(imageSrc)
            await setMainImageIndex(image.id)
            await setLoading(false)
        }
        console.log("reading " + image.name + " " + image.id)
        setLoading(true)
        reader.readAsDataURL(image.file)
    }

    return (
        <Segment basic>
            <Divider hidden />
            <Header as="h2">Attach Images</Header>
            <div>
                <ImageUpload
                    key={"upload2"}
                    setMainImage={saveMainImage}
                    mainImageIndex={mainImageIndex}
                    loading={loading}
                />
            </div>

            <Header as="h3">Main Image</Header>
            {mainImageSrc ? (
                <Image src={mainImageSrc} />
            ) : (
                <Message>No main image set.</Message>
            )}
        </Segment>
    )
}
