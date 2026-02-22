import React, { useState } from 'react'
import { Title, Button, Navbar } from '@allxsmith/bestax-bulma'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../hooks/auth'
import { Trans } from '@lingui/react/macro'
import './Header.scss'

const Header = ({ views, title }) => {
  const [burgerActive, setBurgerActive] = useState(false)
  const { isLoggedIn, getUser, logout } = useAuth()

  return (
    <Navbar color='primary' active={burgerActive ? true : undefined}>
      <Navbar.Brand>
        <Title>{title}</Title>
        <Navbar.Burger onClick={() => setBurgerActive(!burgerActive)} />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Start>
          <Views views={views} />
        </Navbar.Start>
        <Navbar.End>
          {isLoggedIn() || (
            <Navbar.Item as={Link} to='/login'>
              <Button><Trans>Log in</Trans></Button>
            </Navbar.Item>
          )}
          {isLoggedIn() && (
            <Navbar.Item>
              <Button onClick={logout}><Trans>Log out {getUser()}</Trans></Button>
            </Navbar.Item>
          )}
        </Navbar.End>
      </Navbar.Menu>
    </Navbar>
  )
}

const Views = ({ views }) => {
  const { isViewAllowed } = useAuth()

  return (
    <>
      {views.map(view => {
        const allowed = isViewAllowed(view)
        return (
          <Navbar.Item key={view.name} to={`/${view.name}`} as={NavLink}>
            {view.isPublic || <FontAwesomeIcon icon={allowed ? faLockOpen : faLock} />}
            {view.title}
          </Navbar.Item>
        )
      })}
    </>
  )
}

export default Header
