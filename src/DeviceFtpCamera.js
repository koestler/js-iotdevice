import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import config from 'react-global-configuration'

class DeviceFtpCamera extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
    }

    constructor (props) {
        super(props)

        this.state = {
            timestamp: Date.now(),
            timestampInterval: null
        }
    }

    componentDidMount () {
        const timestampInterval = setInterval(() => {this.setState({timestamp: Date.now()})}, 2000)
        this.setState({timestampInterval})
    }

    componentWillUnmount () {
        clearInterval(this.state.timestampInterval)
    }

    render () {
        const imgSrc = config.get('apiUrl') + 'device/' + this.props.id + '/Picture/Thumb?timestamp='
          + this.state.timestamp
        return <div className="device-ftp-camera">
            <img src={imgSrc} alt={this.props.id}/>
        </div>
    }
}

export default DeviceFtpCamera
