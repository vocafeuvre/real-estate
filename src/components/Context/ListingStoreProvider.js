import React from "react"
import ListingStoreContext from "./ListingStoreContext"
import firebase from "../../utils/firebase"

const APPROVED_STATUS = "approved"
const PUBLISHED_STATUS = "published"

const ListingStoreProvider = ({ children }) => {
    const publishListing = (listing, successCallback, errorCallback) => {
        if (typeof window !== "undefined") {
            const db = firebase.firestore()
            const batch = db.batch()

            const listingRef = db.collection("listings").doc()
            batch.set(listingRef, {
                address: listing.info.address,
                description: listing.info.description,
                price: listing.info.price,
                priceUom: listing.info.priceUom,
                name: listing.info.listingName,
                referrer: listing.referrer,
                location: new firebase.firestore.GeoPoint(
                    listing.location.lat,
                    listing.location.lng
                ),
                status: PUBLISHED_STATUS,
            })

            const subImages = listing.images.filter(value => {
                return value.id !== listing.mainImageId
            })

            subImages.forEach(value => {
                const imageRef = db.collection("images").doc()
                batch.set(imageRef, {
                    listing: listingRef.id,
                    src: value.src,
                })
            })

            const mainImage = listing.images.find(value => {
                return value.id === listing.mainImageId
            })
            const mainImageRef = db.collection("images").doc()
            batch.set(mainImageRef, {
                listing: listingRef.id,
                src: mainImage.src,
            })

            batch.update(listingRef, {
                mainImage: mainImageRef.id,
            })

            batch
                .commit()
                .then(() => {
                    successCallback()
                })
                .catch(err => {
                    errorCallback(err)
                })
        }
    }

    const approveListing = (listing, successCallback, errorCallback) => {
        if (typeof window !== "undefined") {
            const db = firebase.firestore()

            const listingRef = db.collection("listings").doc(listing.id)
            listingRef
                .update({
                    status: APPROVED_STATUS,
                })
                .then(() => {
                    successCallback()
                })
                .catch(err => {
                    errorCallback()
                })
        }
    }

    const updateListing = (listing, successCallback, errorCallback) => {
        if (typeof window !== "undefined") {
        }
    }

    const removeListing = (listing, successCallback, errorCallback) => {
        if (typeof window !== "undefined") {
        }
    }

    return (
        <ListingStoreContext.Provider
            value={{
                publishListing,
                approveListing,
                updateListing,
                removeListing,
            }}
        >
            {children}
        </ListingStoreContext.Provider>
    )
}

export default ListingStoreProvider
