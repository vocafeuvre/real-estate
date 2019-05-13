import React from 'react'

const UploadContext = React.createContext({
    uploadFile: () => {},
    deleteFile: () => {}
})

export default UploadContext