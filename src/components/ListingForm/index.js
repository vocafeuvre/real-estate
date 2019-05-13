import React, { Component } from "react"
import { Step, Segment, Divider, Button, Message } from "semantic-ui-react"
import { navigate } from "gatsby"

import ListingImages from "./ListingImages"
import ListingInfo from "./ListingInfo"
import ListingLocation from "./ListingLocation"

const formSteps = [
    {
        header: "Info",
        description: "All about your listing",
        icon: "info circle",
    },
    {
        header: "Location",
        description: "Where's your listing at?",
        icon: "map",
    },
    {
        header: "Images",
        description: "Show your listing",
        icon: "picture",
    },
]

const forms = [<ListingInfo />, <ListingLocation />, <ListingImages />]

const infoValidate = values => {
    const errors = {}

    const nameCharLimit = 50
    if (!values.listingName) {
        errors.listingName = "Listing Name is required"
    } else if (values.listingName.length > nameCharLimit) {
        errors.listingName = `Character limit is at ${nameCharLimit}`
    }

    const descCharLimit = 300
    if (!values.description) {
        errors.description = "Description is required"
    } else if (values.description.length > descCharLimit) {
        errors.description = `Character limit is at ${descCharLimit}`
    }

    const addressCharLimit = 100
    if (!values.address) {
        errors.address = "Address is required"
    } else if (values.address.length > addressCharLimit) {
        errors.address = `Character limit is at ${addressCharLimit}`
    }

    const priceUomCharLimit = 3
    if (!values.priceUom) {
        errors.priceUom = "Currency is required"
    } else if (values.priceUom.length > priceUomCharLimit) {
        errors.priceUom = `Character limit is at ${priceUomCharLimit}. Ex: USD`
    }

    if (!values.price) {
        errors.price = "Price is required"
    } else if (isNaN(Number.parseFloat(values.price.replace(",", "")))) {
        errors.price = "Price should be a number"
    }

    return errors
}

class ListingForm extends Component {
    state = {
        step: 0,
        listingInfo: {},
        listingInfoErrors: {},
        listingLocation: {},
        listingImages: [],
        listingImageErrors: [],
        listingMainImageId: "",
        isPublished: false,
        publishError: "",
    }

    constructor() {
        super()

        this.setFormStep = this.setFormStep.bind(this)
        this.setListingInfo = this.setListingInfo.bind(this)
        this.validateListingInfo = this.validateListingInfo.bind(this)
        this.setListingLocation = this.setListingLocation.bind(this)
        this.setListingImage = this.setListingImage.bind(this)
        this.setImageAsMain = this.setImageAsMain.bind(this)
        this.removeListingImage = this.removeListingImage.bind(this)
        this.validateListingImages = this.validateListingImages.bind(this)

        this.publishListing = this.publishListing.bind(this)
        this.setIsPublished = this.setIsPublished.bind(this)
        this.setPublishError = this.setPublishError.bind(this)
    }

    componentDidMount() {
        if (!this.props.token) {
            navigate('/')
        }
    }

    componentWillUnmount() {
        if (!this.state.isPublished) {
            this.state.listingImages.forEach(value => {
                this.props.deleteFile(value, null, null)
            })
        }
    }

    publishListing() {
        const canProceed = this.validateListingImages()

        if (canProceed) {
            let listing = {}

            listing.info = { ...this.state.listingInfo }
            listing.location = { ...this.state.listingLocation }
            listing.images = [...this.state.listingImages]
            listing.mainImageId = this.state.listingMainImageId
            listing.referrer = this.props.userId

            this.props.publishListing(
                listing,
                () => this.setIsPublished(true),
                this.setPublishError
            )
        }
    }

    setPublishError(error) {
        this.setState({
            publishError: error,
        })
    }

    setIsPublished(value) {
        this.setState({
            isPublished: value,
        })

        navigate("/")
    }

    setFormStep(index) {
        this.setState({
            step: index,
        })
    }

    setListingInfo(infoValue) {
        this.setState(state => {
            return {
                listingInfo: {
                    ...state.listingInfo,
                    ...infoValue,
                },
            }
        })
    }

    validateListingInfo() {
        const errors = infoValidate(this.state.listingInfo)

        if (Object.keys(errors).length === 0) {
            this.setState({
                listingInfoErrors: {},
            })

            return true
        } else {
            this.setState({
                listingInfoErrors: errors,
            })

            return false
        }
    }

    setListingLocation(location) {
        this.setState({
            listingLocation: location,
        })
    }

    setListingImage(image) {
        this.setState(state => {
            return {
                listingImages: [...state.listingImages, image],
            }
        })
    }

    setImageAsMain(image) {
        this.setState({
            listingMainImageId: image.id,
        })
    }

    validateListingImages() {
        let imageErrors = []

        if (this.state.listingMainImageId === "") {
            imageErrors.push("Main image has not been set.")
        }

        if (this.state.listingImages === []) {
            imageErrors.push("No images have been uploaded for this listing.")
        }

        this.setState({
            listingImageErrors: imageErrors,
        })

        return imageErrors.length === 0
    }

    removeListingImage(image) {
        this.setState(state => {
            const mainImageId =
                state.listingMainImageId === image.id
                    ? null
                    : state.listingMainImageId
            const newListingImages = state.listingImages.filter(value => {
                return value.id !== image.id
            })

            return {
                listingMainImageId: mainImageId,
                listingImages: newListingImages,
            }
        })
    }

    render() {
        let formProps = {}

        switch (this.state.step) {
            case 0:
                formProps = {
                    setListingInfo: this.setListingInfo,
                    validateListingInfo: this.validateListingInfo,
                    listingInfoErrors: this.state.listingInfoErrors,
                    listingInfo: this.state.listingInfo,
                    next: () => this.setFormStep(1),
                }
                break
            case 1:
                formProps = {
                    setListingLocation: this.setListingLocation,
                    listingLocation: this.state.listingLocation,
                    next: () => this.setFormStep(2),
                    previous: () => this.setFormStep(0),
                }
                break
            case 2:
                formProps = {
                    setListingImage: this.setListingImage,
                    setImageAsMain: this.setImageAsMain,
                    removeListingImage: this.removeListingImage,
                    listingImages: this.state.listingImages,
                    listingMainImageId: this.state.listingMainImageId,
                    listingImageErrors: this.listingImageErrors,
                    validateListingImages: this.validateListingImages,
                    previous: () => this.setFormStep(1),
                }
                break
            default:
                formProps = {}
        }

        const { publishError } = this.state
        return (
            <>
                {publishError.length === 0 ? null : (
                    <Message error>
                        <Message.Header>Error</Message.Header>
                        An error was encountered while publishing this listing.
                        Please contact the administrators of this site.
                    </Message>
                )}
                <Segment basic>
                    <Step.Group fluid size="small">
                        {formSteps.map((value, index) => {
                            return (
                                <Step
                                    key={index}
                                    active={index === this.state.step}
                                    completed={index < this.state.step}
                                    icon={value.icon}
                                    link
                                    title={value.header}
                                    description={value.description}
                                />
                            )
                        })}
                    </Step.Group>
                </Segment>
                {React.cloneElement(forms[this.state.step], formProps)}
                <Divider hidden />
                <Message info>
                    <Message.Header>Note to Publisher</Message.Header>
                    Your listing will be screened by our real estate moderators
                    before being published to the site. This will ensure our
                    customers that only quality listings are provided to them.
                </Message>
                <Button
                    disabled={this.state.step !== forms.length - 1}
                    type="button"
                    onClick={e => this.publishListing()}
                >
                    Publish Listing
                </Button>
            </>
        )
    }
}

export default ListingForm
