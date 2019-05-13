import React from "react"
import UploadContext from "./UploadContext"
import firebase from "../../utils/firebase"

const UploadProvider = ({ children }) => {
    const uploadFile = (
        file,
        successCallback,
        errorCallback,
        progressCallback
    ) => {
        if (typeof window !== "undefined") {
            const fileRef = firebase
                .storage()
                .ref()
                .child(`images/${file.id}`)
            const uploadTask = fileRef.putString(file.dataUrl, "data_url", {
                contentType: file.type,
            })

            uploadTask.on(
                "state_changed",
                snapshot => {
                    let progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    progressCallback(progress)
                },
                error => {
                    errorCallback(error)
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(src => {
                        successCallback(src)
                    })
                }
            )
        }
    }

    const deleteFile = (file, successCallback, errorCallback) => {
        if (typeof window !== "undefined") {
            const fileRef = firebase
                .storage()
                .ref()
                .child(`images/${file.id}`)

            fileRef
                .delete()
                .then(() => {
                    if (successCallback) {
                        successCallback()
                    }
                })
                .catch(error => {
                    if (errorCallback) {
                        errorCallback(error)
                    }
                })
        }
    }

    return (
        <UploadContext.Provider
            value={{
                uploadFile,
                deleteFile,
            }}
        >
            {children}
        </UploadContext.Provider>
    )
}

export default UploadProvider
