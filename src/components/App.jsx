import React, { Fragment } from 'react'
import { Button, Container, Notification, Section } from 'react-bulma-components'
import ConfiguredApp from './ConfiguredApp'
import { useConfig } from '../hooks/unauthApi'
import { Trans } from '@lingui/macro'
import { SimpleFooter } from './Footer'

const App = () => {
  const { config, success, error } = useConfig()
  if (success) {
    return <ConfiguredApp {...config} />
  } else if (error) {
    return <Error error={error} />
  } else {
    return <Loading />
  }
}

const Error = ({ error }) => {
  return (
    <>
      <Section>
        <Notification color='danger'><Trans>Cannot load configuration: {error}</Trans></Notification>
      </Section>
      <SimpleFooter />
    </>
  )
}

const Loading = () => {
  return (
    <>
      <Section>
        <Notification color='info'><Trans>Loading initial configuration</Trans></Notification>
        <Container>
          <Button size='large' loading />
        </Container>
      </Section>
      <SimpleFooter />
    </>
  )
}

export default App
