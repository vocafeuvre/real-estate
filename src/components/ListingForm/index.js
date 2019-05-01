import React, { useState, useContext } from "react"
import { Step, Segment } from "semantic-ui-react"
import AuthContext from "../../components/Context/AuthContext"

import ListingImages from './ListingImages'
import ListingInfo from './ListingInfo'
import ListingLocation from './ListingLocation'

export default () => {
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState([])
    const [formStep, setFormStep] = useState(0)
    const { user, token } = useContext(AuthContext)

    const formSteps = [
        {
            header: "Info",
            description: "All about your listing",
            icon: "info circle",
        },
        {
            header: "Location",
            description: "Where is your listing at?",
            icon: "map",
        },
        {
            header: "Images",
            description: "How does your listing look?",
            icon: "picture",
        },
    ]

    const forms = [
        <ListingInfo />,
        <ListingLocation />,
        <ListingImages />
    ]

    return (
        <>
            <Segment basic>
                <Step.Group fluid size="small">
                    {formSteps.map((value, index) => {
                        return (
                            <Step
                                key={index}
                                active={index === formStep}
                                icon={value.icon}
                                link
                                onClick={e => setFormStep(index)}
                                title={value.header}
                                description={value.description}
                            />
                        )
                    })}
                </Step.Group>
            </Segment>
            { forms[formStep] }
        </>
    )
}
