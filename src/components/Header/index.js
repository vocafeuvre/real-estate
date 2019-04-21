import React, {useContext} from 'react'
import {Responsive} from 'semantic-ui-react'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'
import AuthContext from '../Context/AuthContext'

const Header = ({location}) => {
	const {token, signOut} = useContext(AuthContext)

	return (
		<>
			<Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
				<MobileMenu
					location={location}
					token={token}
					signout={signOut}
				/>
			</Responsive>
			<Responsive minWidth={Responsive.onlyTablet.minWidth}>
				<DesktopMenu
					location={location}
					token={token}
					signout={signOut}
				/>
			</Responsive>
		</>
	)
}

export default Header
