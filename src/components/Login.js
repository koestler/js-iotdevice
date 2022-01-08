import React, { useEffect } from 'react'
import { Button, Box, Form, Section, Heading, Notification } from 'react-bulma-components'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/auth'
import { useLogin } from '../hooks/unauthApi'
import { Trans } from '@lingui/macro'

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { logout, isLoggedIn, getUser } = useAuth()
  const { login, success, error } = useLogin()

  const onSubmit = async data => {
    logout()
    login(data.user, data.password)
  }

  useEffect(() => {
    if (success) reset()
  }, [success, reset])

  return (
    <Section>
      <Heading renderAs='h2'>Log in</Heading>
      <Box style={{ maxWidth: 600, margin: 'auto' }}>
        {success && isLoggedIn() && <Notification color='success'><Trans>You have been logged in as {getUser()}.</Trans></Notification>}
        {!success && isLoggedIn() && <Notification color='info'><Trans>You are logged in as {getUser()}.</Trans></Notification>}
        {error && !isLoggedIn() && <Notification color='danger'><Trans>Login failed: {error}</Trans></Notification>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field>
            <Form.Label><Trans>User</Trans></Form.Label>
            <input
              type='text'
              className={'input is-primary' + (errors.user ? ' is-danger' : '')}
              {...register('user', { required: true, minLength: 2 })}
            />
          </Form.Field>
          <Form.Field>
            <Form.Label><Trans>Password</Trans></Form.Label>
            <input
              type='password'
              className={'input is-primary' + (errors.password ? ' is-danger' : '')}
              {...register('password', { required: true, minLength: 4 })}
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
