import React, { useContext } from "react"
import { Segment, Divider, Button } from "semantic-ui-react"

import FileUpload from "./FileUpload"
import UploadContext from "../Context/UploadContext"

export const LOCAL_STORAGE_KEY = "LISTING_IMAGES"

const ListingImages = props => {
    const { uploadFile, deleteFile } = useContext(UploadContext)

    const {
        previous,
        setListingImage,
        setImageAsMain,
        removeListingImage,
        listingImages,
        listingMainImageId,
        listingImageErrors,
    } = props

    return (
        <Segment basic>
            <FileUpload
                uploadFile={uploadFile}
                deleteFile={deleteFile}
                fileLimit={20}
                localStorageKey={LOCAL_STORAGE_KEY}
                uploadedFiles={listingImages}
                setUploadedFile={setListingImage}
                setMainFile={setImageAsMain}
                mainFileId={listingMainImageId}
                removeUploadedFile={removeListingImage}
            />
            {listingImageErrors && listingImageErrors.length !== 0
                ? listingImageErrors.map(value => {
                      return (
                          <p data-testid="error" style={{ color: "red" }}>
                              {value}
                          </p>
                      )
                  })
                : null}
            <Divider hidden />
            <Button.Group>
                <Button secondary type="button" onClick={e => previous()}>
                    Back
                </Button>
            </Button.Group>
        </Segment>
    )
}

export default ListingImages
