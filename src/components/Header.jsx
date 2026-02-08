import React, { useState } from 'react'
import { Heading, Button, Navbar } from 'react-bulma-components'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../hooks/auth'
import { Trans } from '@lingui/macro'
import './Header.scss'

const Header = ({ views, title }) => {
  const [burgerActive, setBurgerActive] = useState(false)
  const { isLoggedIn, getUser, logout } = useAuth()

  return (
    <Navbar color='primary' active={burgerActive}>
      <Navbar.Brand>
        <Heading>{title}</Heading>
        <Navbar.Burger onClick={() => setBurgerActive(!burgerActive)} />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <Views views={views} />
        </Navbar.Container>
        <Navbar.Container align='end'>
          {isLoggedIn() || (
            <Navbar.Item renderAs={Link} to='/login'>
              <Button><Trans>Log in</Trans></Button>
            </Navbar.Item>
          )}
          {isLoggedIn() && (
            <Navbar.Item>
              <Button onClick={logout}><Trans>Log out {getUser()}</Trans></Button>
            </Navbar.Item>
          )}
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  )
}

const Views = ({ views }) => {
  const { isViewAllowed } = useAuth()

  return views.map(view => {
    const allowed = isViewAllowed(view)
    return (
      <Navbar.Item key={view.name} to={`/${view.name}`} activeClassName='is-active' renderAs={NavLink}>
        {view.isPublic || <FontAwesomeIcon icon={allowed ? faLockOpen : faLock} />}
        {view.title}
      </Navbar.Item>
    )
  }
  )
}

export default Header
