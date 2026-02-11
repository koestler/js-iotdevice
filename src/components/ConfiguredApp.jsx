import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './Header'
import View from './View'
import Login from './Login'
import Footer from './Footer'
import { Title, Notification, Section } from '@allxsmith/bestax-bulma'
import { useAuth } from '../hooks/auth'
import { Trans } from '@lingui/react/macro'
import * as bulmaToast from 'bulma-toast'

const ConfiguredApp = ({ projectTitle, backendVersion, views }) => {
  const { isViewVisible } = useAuth()
  const myViews = views.filter(isViewVisible)
  const { isViewAllowed } = useAuth()

  return (
    <BrowserRouter>
      <title>{projectTitle}</title>
      <Header title={projectTitle} views={myViews} />
      <Routes>
        {myViews.map(view =>
          <Route key={view.name} path={`/${view.name}`} element={isViewAllowed(view) ? <View {...view} /> : <Login />} />
        )}
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<DefaultRoute views={myViews} />} />
      </Routes>
      <Footer backendVersion={backendVersion} />
    </BrowserRouter>
  )
}

const DefaultRoute = ({ views }) => {
  if (views.length < 1) {
    return (
      <Section>
        <Title>Empty</Title>
        <Notification>
          <Trans>No views are defined. Check your config.yaml</Trans>
        </Notification>
      </Section>
    )
  }

  const defaultView = views[0]
  return <Navigate to={`/${defaultView.name}`} replace />
}

bulmaToast.setDefaults({
  duration: 2000,
  position: 'top-center',
  opacity: 0.8,
  closeOnClick: true
})

export default ConfiguredApp
