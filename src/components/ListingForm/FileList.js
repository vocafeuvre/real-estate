import React from "react"
import { Segment, List } from "semantic-ui-react"
import FileItem from "./FileItem"

const FileList = props => {
    return (
        <Segment basic>
            <List divided relaxed>
                {props.files.map((file, index) => {
                    return (
                        <FileItem
                            viewFile={props.viewFile}
                            deleteUploadedFile={props.deleteUploadedFile}
                            removeFile={props.removeFile}
                            uploadFile={props.uploadFile}
                            setUploadedFile={props.setUploadedFile}
                            mainFileId={props.mainFileId}
                            setMainFile={props.setMainFile}
                            file={file}
                            key={index}
                        />
                    )
                })}
            </List>
        </Segment>
    )
}

export default FileList
