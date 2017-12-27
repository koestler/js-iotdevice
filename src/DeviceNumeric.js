import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import GaugeWrapper from './GauageWrapper'
import { CurrentGauge, PercentageGauge, VoltageGauge } from './Gauge'
import NumericValuesTable from './NumericValuesTable'
import config from 'react-global-configuration'

class DeviceNumeric extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
    }

    constructor (props) {
        super(props)

        this.state = {
            roundedValues: null,
        }
    }

    fetchDataFromApi = () => {
        axios.get(config.get('apiUrl') + 'device/' + this.props.id + '/RoundedValues')
          .then(res => {
              this.setState({roundedValues: res.data})
          })
    }

    componentDidMount () {
        this.fetchDataFromApi()
        const intervalId = setInterval(this.fetchDataFromApi, 2000)
        this.setState({intervalId})
    }

    componentWillUnmount () {
        clearInterval(this.state.intervalId)
    }

}

export default DeviceNumeric
