import React, { useState } from 'react'
import { Button, Box, Form, Section, Heading } from 'react-bulma-components'
import { useAuth } from '../hooks/auth'
import { useLogin } from '../hooks/unauthApi'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { toast } from 'bulma-toast'

const Login = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const { logout } = useAuth()
  const { login } = useLogin({
    onSucces: user => toast({ message: t`You have been logged in as ${user}.`, type: 'is-success' }),
    onError: () => toast({ message: t`Login failed`, type: 'is-danger' })
  })

  const validateForm = () => {
    const newErrors = {}
    if (!user || user.length < 2) {
      newErrors.user = true
    }
    if (!password || password.length < 4) {
      newErrors.password = true
    }
    return newErrors
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      logout()
      login(user, password)
    }
  }

  return (
    <Section>
      <Heading renderAs='h2'>Log in</Heading>
      <Box style={{ maxWidth: 600, margin: 'auto' }}>
        <form onSubmit={onSubmit}>
          <Form.Field>
            <Form.Label><Trans>User</Trans></Form.Label>
            <input
              type='text'
              className={'input is-primary' + (errors.user ? ' is-danger' : '')}
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Form.Label><Trans>Password</Trans></Form.Label>
            <input
              type='password'
              className={'input is-primary' + (errors.password ? ' is-danger' : '')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Field>
          <Button.Group align='right'>
            <Button color='primary'><Trans>Log in</Trans></Button>
          </Button.Group>
        </form>
      </Box>
    </Section>
  )
}

export default Login
