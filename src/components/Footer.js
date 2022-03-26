import React from 'react'
import { Footer as BulmaFooter, Container, Content } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import LanguageSelector from './LanguageSelector'

const Footer = (props) => (
  <SimpleFooter {...props}>
    <LanguageSelector />
  </SimpleFooter>
)

export const SimpleFooter = ({ children, backendVersion }) => {
  return (
    <BulmaFooter>
      <Container>
        <Content style={{ textAlign: 'center' }}>
          <p>
            <a href='https://github.com/koestler/go-iotsensor'><strong>go-iotsensor</strong> {backendVersion && ' (' + backendVersion + ')'}</a>
            {' '}and{' '}
            <a href='https://github.com/koestler/js-iotdevice'><strong>js-iotdevice</strong> ({process.env.REACT_APP_VERSION})</a>.<br />
            The source code is available under <a href='https://github.com/koestler/go-iotsensor/blob/main/LICENSE'>MIT</a> on <a href='https://github.com/koestler'><FontAwesomeIcon icon={faGithub} /></a>.
          </p>
          {children}
        </Content>
      </Container>
    </BulmaFooter>
  )
}

export default Footer