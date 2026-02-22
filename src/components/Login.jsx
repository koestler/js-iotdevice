import React from 'react'
import { Button, Buttons, Box, Section, Title, Field } from '@allxsmith/bestax-bulma'
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

  return (
    <Section>
      <Title as='h2'><Trans>Log in</Trans></Title>
      <Box style={{ maxWidth: 600, margin: 'auto' }}>
        <form>
          <Field label={<Trans>User</Trans>}>
            <input
              type='text'
              className={'input is-primary' + (errors.user ? ' is-danger' : '')}
            />
          </Field>
          <Field label={<Trans>Password</Trans>}>
            <input
              type='password'
              className={'input is-primary' + (errors.password ? ' is-danger' : '')}
            />
          </Field>
          <Buttons isRight>
            <Button color='primary'><Trans>Log in</Trans></Button>
          </Buttons>
        </form>
      </Box>
    </Section>
  )
}

export default Login
