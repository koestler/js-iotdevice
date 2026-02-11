import React from 'react'
import { Button, Box, Section, Title, Field } from '@allxsmith/bestax-bulma'
import { useAuth } from '../hooks/auth'
import { useLogin } from '../hooks/unauthApi'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { toast } from 'bulma-toast'

const Login = () => {
  const { logout } = useAuth()
  const { login } = useLogin({
    onSucces: user => toast({ message: t`You have been logged in as ${user}.`, type: 'is-success' }),
    onError: () => toast({ message: t`Login failed`, type: 'is-danger' })
  })
  const errors = {
    user: false,
    password: false
  }

  const onSubmit = async data => {
    logout()
    login(data.user, data.password)
  }

  return (
    <Section>
      <Title renderAs='h2'>Log in</Title>
      <Box style={{ maxWidth: 600, margin: 'auto' }}>
        <form>
          <Field>
            <Form.Label><Trans>User</Trans></Form.Label>
            <input
              type='text'
              className={'input is-primary' + (errors.user ? ' is-danger' : '')}
            />
          </Field>
          <Field>
            <Form.Label><Trans>Password</Trans></Form.Label>
            <input
              type='password'
              className={'input is-primary' + (errors.password ? ' is-danger' : '')}
            />
          </Field>
          <Button.Group align='right'>
            <Button color='primary'><Trans>Log in</Trans></Button>
          </Button.Group>
        </form>
      </Box>
    </Section>
  )
}

export default Login
