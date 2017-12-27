import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Glyphicon } from 'react-bootstrap'
import config from 'react-global-configuration'
import './DeviceFtpCamera.css'

class DeviceFtpCamera extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
    }

    constructor (props) {
        super(props)

        this.state = {
            timestamp: Date.now(),
            timestampInterval: null,
            fullScreen: false,
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
            <img
              src={imgSrc}
              alt={this.props.id}
              onClick={() => { this.setState({fullScreen: true})}}
            />
            {this.state.fullScreen &&
            <FullScreenDeviceFtpCamera
              id={this.props.id}
              timestamp={this.state.timestamp}
              onClose={() => { this.setState({fullScreen: false})}}
            />}
        </div>
    }
}

class FullScreenDeviceFtpCamera extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
    }

    render () {
        const imgSrc = config.get('apiUrl') + 'device/' + this.props.id + '/Picture/Raw?timestamp='
          + this.props.timestamp

        return <div
          className="full-screen"
          onClick={this.props.onClose}
        >
            <Glyphicon
              className="close"
              glyph="glyphicon glyphicon-remove"
            />
            <img src={imgSrc} alt={this.props.id}/>
        </div>
    }

}

export default DeviceFtpCamera
