import React, { useState } from "react"
import { Segment, Icon, Header, List, Button } from "semantic-ui-react"

const copy = o => {
    var output, v, key
    output = Array.isArray(o) ? [] : {}
    for (key in o) {
        v = o[key]
        output[key] = typeof v === "object" ? copy(v) : v
    }
    return output
}

const ImageUpload = props => {
    const fileLimit = props.fileLimit || 0

    const [files, setFiles] = useState([])
    const [draggedOver, setDraggedOver] = useState(false)

    const removeFile = fileIndex => {
        setFiles(
            files.filter((value, index) => {
                return fileIndex !== index
            })
        )
    }

    const addFiles = files => {
        let filesWithId = []

        for (let x = 0; x < files.length; x++) {
            if (
                files[x].type.startsWith("image") &&
                x < fileLimit === !!fileLimit
            ) {
                filesWithId[x] = {
                    id: `${files[x].name}${Math.random() * 100}`,
                    name: files[x].name,
                    type: files[x].type,
                    file: files[x],
                }
            }
        }

        setFiles(filesWithId)
    }

    return (
        <React.Fragment>
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
                        addFiles(e.dataTransfer.files)
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
                        addFiles(e.target.files)
                    }}
                    style={{ display: "none" }}
                />
            </Segment>
            {files.length === 0 ? null : (
                <Segment basic>
                    <List divided relaxed>
                        {files.map((file, index) => {
                            return (
                                <List.Item key={index}>
                                    <List.Content floated="right">
                                        <Button
                                            disabled={file.id === props.mainImageIndex}
                                            loading={props.loading}
                                            size="mini"
                                            onClick={e => {
                                                removeFile(index)
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </List.Content>
                                    <List.Content floated="right">
                                        <Button
                                            disabled={file.id === props.mainImageIndex}
                                            loading={props.loading}
                                            size="mini"
                                            onClick={e => {
                                                props.setMainImage(file)
                                            }}
                                        >
                                            Set as Main
                                        </Button>
                                    </List.Content>
                                    <List.Icon
                                        name="picture"
                                        size="large"
                                        verticalAlign="middle"
                                    />
                                    <List.Content>
                                        <Header as="a">{file.name}</Header>
                                    </List.Content>
                                </List.Item>
                            )
                        })}
                    </List>
                </Segment>
            )}
            {props.onSave ? (
                <Button color="black" onClick={e => props.onSave(files)}>
                    Save
                </Button>
            ) : null}
        </React.Fragment>
    )
}

export default ImageUpload
