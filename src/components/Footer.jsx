import React from 'react'
import { Footer as BulmaFooter, Container, Content } from '@allxsmith/bestax-bulma'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import LanguageSelector from './LanguageSelector'
import {Trans} from '@lingui/react/macro'

const frontendVersion = import.meta.env.VITE_VERSION

const Footer = (props) => (
  <SimpleFooter {...props}>
    <LanguageSelector />
  </SimpleFooter>
)

export const SimpleFooter = ({ children, backendVersion }) => {
  const gh = <a href='https://github.com/koestler'><FontAwesomeIcon icon={faGithub} /></a>

  return (
    <BulmaFooter>
      <Container>
        <Content style={{ textAlign: 'center' }}>
          <p>
            <a href='https://github.com/koestler/go-iotdevice'><strong>go-iotdevice</strong> {backendVersion && ' (' + backendVersion + ')'}</a>
            {' '}<Trans>and</Trans>{' '}
            <a href='https://github.com/koestler/js-iotdevice'><strong>js-iotdevice</strong> ({frontendVersion})</a>.<br />
            <Trans>
              The source code is available under <a href='https://github.com/koestler/go-iotdevice/blob/main/LICENSE'>MIT</a> on {gh}.
            </Trans>
          </p>
          {children}
        </Content>
      </Container>
    </BulmaFooter>
  )
}

export default Footer
