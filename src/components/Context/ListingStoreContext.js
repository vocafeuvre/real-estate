import React from 'react'

const ListingStoreContext = React.createContext({
    publishListing: () => {},
    approveListing: () => {},
    updateListing: () => {},
    removeListing: () => {}
})

export default ListingStoreContext