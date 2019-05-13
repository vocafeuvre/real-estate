import React, { useState } from "react"
import { List, Button, Header, Label, Progress } from "semantic-ui-react"

const FileItem = props => {
    const [error, setError] = useState(null)
    const [progress, setProgress] = useState(null)

    return (
        <List.Item>
            <List.Content floated="right">
                <Button
                    size="mini"
                    onClick={e => {
                        if (props.file.isUploaded) {
                            props.deleteUploadedFile(
                                props.file,
                                () => props.removeFile(props.file),
                                setError
                            )
                        } else {
                            props.removeFile(props.file)
                        }
                    }}
                >
                    Remove
                </Button>
            </List.Content>
            {props.file.isUploaded ? (
                <List.Content floated="right">
                    <Button
                        size="mini"
                        disabled={props.file.id === props.mainFileId}
                        onClick={e => props.setMainFile(props.file)}
                    >
                        Set as Main
                    </Button>
                </List.Content>
            ) : (
                <List.Content floated="right">
                    <Button
                        size="mini"
                        onClick={e => {
                            props.uploadFile(
                                props.file,
                                src => {
                                    props.setUploadedFile(props.file, src)
                                    setProgress(null)
                                    setError(null)
                                },
                                setError,
                                setProgress
                            )
                        }}
                    >
                        Upload
                    </Button>
                </List.Content>
            )}
            <List.Icon name="picture" size="large" verticalAlign="middle" />
            <List.Content>
                <Header
                    as="a"
                    onClick={e => {
                        props.viewFile(props.file)
                    }}
                >
                    {props.file.id}
                </Header>
            </List.Content>
            {error ? (
                <List.Content floated="right">
                    <Label color="red">
                        An error occurred, please try again.
                    </Label>
                </List.Content>
            ) : null}
            {progress === null ? null : (
                <Progress
                    percent={progress}
                    indicating
                    attached="bottom"
                    size="tiny"
                />
            )}
        </List.Item>
    )
}

export default FileItem
