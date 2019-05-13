import React, { Component } from "react"
import { Message, Dimmer, Image } from "semantic-ui-react"
import Dropzone from "./Dropzone"
import FileList from "./FileList"

class FileUpload extends Component {
    state = {
        files: [],
        uploadedFiles: [],
        promptFileLimit: false,
        viewFileSrc: "",
        shouldViewFile: false,
    }

    constructor() {
        super()

        this.addFiles = this.addFiles.bind(this)
        this.removeFile = this.removeFile.bind(this)
        this.viewFile = this.viewFile.bind(this)
        this.setUploadedFile = this.setUploadedFile.bind(this)
        this.setViewFileSrc = this.setViewFileSrc.bind(this)
        this.setFile = this.setFile.bind(this)
        this.closeViewFile = this.closeViewFile.bind(this)
        this.setPromptFileLimit = this.setPromptFileLimit.bind(this)
    }

    componentDidMount() {
        if (this.props.localStorageKey) {
            const serializedFiles = localStorage.getItem(
                this.props.localStorageKey
            )

            if (serializedFiles) {
                this.setState({
                    files: JSON.parse(serializedFiles),
                })
            }
        }
    }

    componentWillUnmount() {
        if (this.props.localStorageKey) {
            localStorage.setItem(
                this.props.localStorageKey,
                JSON.stringify(this.state.files)
            )
        }
    }

    setPromptFileLimit(value) {
        this.setState({
            promptFileLimit: value,
        })
    }

    removeFile(file) {
        if (file.isUploaded) {
            this.props.removeUploadedFile(file)
        } else {
            if (this.props.localStorageKey) {
                localStorage.removeItem(this.props.localStorageKey)
            }

            this.setState(state => {
                return {
                    files: state.files.filter(value => {
                        return file.id !== value.id
                    }),
                }
            })
        }
    }
    
    setUploadedFile(file, src) {
        this.setState(state => {
            return {
                files: state.files.filter(value => {
                    return file.id !== value.id
                }),
            }
        })

        this.props.setUploadedFile({
            id: file.id,
            name: file.name,
            type: file.type,
            src: src,
            isUploaded: true,
        })
    }

    setViewFileSrc(src) {
        this.setState({
            viewFileSrc: src,
            shouldViewFile: true,
        })
    }

    viewFile(file) {
        if (file.isUploaded) {
            this.setViewFileSrc(file.src)
        } else {
            this.setViewFileSrc(file.dataUrl)
        }
    }

    closeViewFile() {
        this.setState({
            viewFileSrc: "",
            shouldViewFile: false,
        })
    }

    setFile(metadata, dataUrl) {
        this.setState(state => {
            return {
                files: [
                    ...state.files,
                    {
                        ...metadata,
                        dataUrl: dataUrl,
                    },
                ],
            }
        })
    }

    addFiles(files) {
        for (let x = 0; x < files.length; x++) {
            if (files[x].type.startsWith("image")) {
                const metadata = {
                    id: `${Math.random() * 100000000}${files[x].name}`,
                    name: files[x].name,
                    type: files[x].type,
                }

                let reader = new FileReader()

                reader.onload = e => {
                    this.setFile(metadata, e.target.result)
                }

                reader.readAsDataURL(files[x])
            }
        }
    }

    render() {
        const {
            files,
            promptFileLimit,
            shouldViewFile,
            viewFileSrc,
        } = this.state

        const { uploadedFiles } = this.props

        const allFiles = [...files, ...uploadedFiles]

        return (
            <React.Fragment>
                {promptFileLimit ? (
                    <Message>File limit is {this.props.fileLimit}</Message>
                ) : null}

                <Dimmer
                    active={shouldViewFile}
                    onClickOutside={this.closeViewFile}
                    page
                >
                    <Image src={viewFileSrc} size="big" />
                </Dimmer>

                <Dropzone
                    setPromptFileLimit={this.setPromptFileLimit}
                    addFiles={this.addFiles}
                    fileLimit={this.props.fileLimit}
                    uploadedFileCount={uploadedFiles.length}
                />

                {allFiles.length === 0 ? null : (
                    <FileList
                        files={allFiles}
                        viewFile={this.viewFile}
                        removeFile={this.removeFile}
                        setUploadedFile={this.setUploadedFile}
                        setMainFile={this.props.setMainFile}
                        mainFileId={this.props.mainFileId}
                        uploadFile={this.props.uploadFile}
                        deleteUploadedFile={this.props.deleteFile}
                    />
                )}
            </React.Fragment>
        )
    }
}

export default FileUpload
