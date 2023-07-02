import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Box, Form, Section, Heading } from 'react-bulma-components'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/auth'
import { useLogin } from '../hooks/unauthApi'
import { Trans, t } from '@lingui/macro'
import { toast } from 'bulma-toast'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { logout, isLoggedIn } = useAuth()
  const { login } = useLogin({
    onSucces: user => toast({ message: t`You have been logged in as ${user}.`, type: 'is-success' }),
    onError: () => toast({ message: t`Login failed`, type: 'is-danger' })
  })

  const onSubmit = async data => {
    logout()
    login(data.user, data.password)
  }

  return (
    <Section>
      <Heading renderAs='h2'>Log in</Heading>
      <Box style={{ maxWidth: 600, margin: 'auto' }}>
        {isLoggedIn() && <Redirect to='/' />}
        {!isLoggedIn() && (
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
        )}
      </Box>
    </Section>
  )
}

export default Login
