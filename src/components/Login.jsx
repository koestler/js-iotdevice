import React from 'react'
import {Button, Buttons, Box, Section, Title, Field, Control, Input, Notification} from '@allxsmith/bestax-bulma'
import {useAuth} from '../hooks/auth'
import {useLogin} from '../hooks/unauthApi'
import {t} from '@lingui/core/macro'
import {Trans} from '@lingui/react/macro'
import {toast} from 'bulma-toast'

const Login = () => {
  const [userError, setUserError] = React.useState(false)
  const [passwordError, setPasswordError] = React.useState(false)
  const formRef = React.useRef(null)

  const {logout, isLoggedIn, getUser} = useAuth()
  const {login} = useLogin({
    onSuccess: user => toast({message: t`You have been logged in as ${user}.`, type: 'is-success'}),
    onError: () => toast({message: t`Login failed`, type: 'is-danger'})
  })

  const submit = async e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const user = formData.get('user')
    const password = formData.get('password')
    setUserError(!user || user.length < 2)
    setPasswordError(!password || password.length < 4)
    logout()
    await login(user, password)
  }

  const loggedIn = isLoggedIn()
  const user = getUser()
  return (
    <Section>
      <Title as='h2'><Trans>Log in</Trans></Title>
      {loggedIn && (
        <Notification color='success'>{t`You are logged in as ${user}.`}</Notification>
      )}
      {loggedIn || (
        <Box style={{maxWidth: 600, margin: 'auto'}}>
          <form ref={formRef} onSubmit={submit}>
            <Field label={<Trans>User</Trans>}>
              <Control>
                <Input name='user' color={userError ? 'danger' : ''}/>
              </Control>
            </Field>
            <Field label={<Trans>Password</Trans>}>
              <Control>
                <Input name='password' type='password' color={passwordError ? 'danger' : ''}/>
              </Control>
            </Field>
            <Buttons isRight>
              <Button color='primary'><Trans>Log in</Trans></Button>
            </Buttons>
          </form>
        </Box>
      )}
    </Section>
  )
}

export default Login
