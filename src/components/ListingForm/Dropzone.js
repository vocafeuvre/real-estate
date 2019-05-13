import React, { useState } from 'react'
import { Segment, Header, Icon } from 'semantic-ui-react'

const Dropzone = props => {
    const [draggedOver, setDraggedOver] = useState(false)

    return (
        <Segment basic>
            <Segment
                placeholder
                onMouseOver={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    setDraggedOver(true)
                }}
                onMouseLeave={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    setDraggedOver(false)
                }}
                onDragOver={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    setDraggedOver(true)
                }}
                onDragLeave={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    setDraggedOver(false)
                }}
                onDrop={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    setDraggedOver(false)

                    if ((e.dataTransfer.files.length + props.uploadedFileCount) > props.fileLimit) {
                        props.setPromptFileLimit(true)
                    } else {
                        props.setPromptFileLimit(false)
                        props.addFiles(e.dataTransfer.files)
                    }
                }}
                htmlFor="file"
                color="blue"
                inverted
                secondary={draggedOver}
                as="label"
                style={{ width: "100%", cursor: "pointer" }}
            >
                <Header as="h2" icon>
                    <Icon name="photo" />
                    Attach an Image
                </Header>
            </Segment>
            <input
                type="file"
                id="file"
                multiple
                onChange={e => {
                    if ((e.target.files.length + props.uploadedFileCount) > props.fileLimit) {
                        props.setPromptFileLimit(true)
                    } else {
                        props.setPromptFileLimit(false)
                        props.addFiles(e.target.files)
                    }
                }}
                style={{ display: "none" }}
            />
        </Segment>
    )
}

export default Dropzone;