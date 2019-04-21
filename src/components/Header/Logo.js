import React from 'react'
import {Image} from 'semantic-ui-react'

import logo from '../../images/logo.svg'

const Logo = () => (
	<Image
		size="mini"
		src={logo}
		style={{marginRight: '1.5em'}}
		alt="Real Listings"
	/>
)

export default Logo
