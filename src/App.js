import React, { Component } from 'react'
import axios from 'axios'
import { Grid, Row, Col, PageHeader } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import DeviceWrapper from './DeviceWrapper'
import config from 'react-global-configuration'
import './App.css'

class App extends Component {

    constructor (props) {
        super(props)

        this.state = {
            frontendConfig: null,
            devices: null,
        }
    }

    static getSortValue (obj) {
        try {
            return obj.FrontendConfig.sort
        } catch (err) {
            if (err instanceof ReferenceError) return 0
        }
    }

    static sortCompare (a, b) {
        const aSort = App.getSortValue(a)
        const bSort = App.getSortValue(b)
        if (aSort < bSort) return -1
        if (aSort > bSort) return 1
        return 0
    }

    componentDidMount () {
        axios.get(config.get('apiUrl') + 'FrontendConfig').then(res => {
            const frontendConfig = res.data
            this.setState({frontendConfig})
        })
        axios.get(config.get('apiUrl') + 'Devices').then(res => {
            let devices = res.data
            devices.sort(App.sortCompare)
            this.setState({devices})
        })
    }

    render () {
        if (this.state.frontendConfig === null || this.state.devices === null) {
            return <p>loading...</p>
        }

        return (
          <Grid className="app">
              <Row>
                  <Col>
                      <PageHeader>{this.state.frontendConfig.title}
                          <small>{this.state.frontendConfig.subtitle}</small>
                      </PageHeader>
                  </Col>
              </Row>
              {this.state.devices.map(
                device =>
                  <Col xs={12} sm={6} md={4} lg={3}>
                      <DeviceWrapper key={device.Name} id={device.Name}
                                     model={device.Model} {...device.FrontendConfig} />
                  </Col>
              )}
          </Grid>
        )
    }
}

export default App
