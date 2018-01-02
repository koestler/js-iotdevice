import React, { Component } from 'react'
import axios from 'axios'
import { Grid, Row, Col, PageHeader } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import DeviceWrapper from './DeviceWrapper'
import config from 'react-global-configuration'

class App extends Component {

    constructor (props) {
        super(props)

        this.state = {
            devices: []
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
        axios.get(config.get('apiUrl') + 'device/').then(res => {
            let devices = res.data
            devices.sort(App.sortCompare)
            this.setState({devices})
        })
    }

    render () {
        return (
          <Grid>
              <Row>
                  <Col>
                      <PageHeader>Giumaglio <small>ve-sensors Dashboard</small></PageHeader>
                  </Col>
              </Row>
              <Col>
                  {this.state.devices.map(
                    device => <DeviceWrapper key={device.Name} id={device.Name} model={device.Model}/>
                  )}
              </Col>
          </Grid>
        )
    }
}

export default App
