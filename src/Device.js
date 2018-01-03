import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DeviceBmv700 from './DeviceBmv700'
import DeviceFtpCamera from './DeviceFtpCamera'
import DeviceMpptSolar from './DeviceSolarMppt'

class Device extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
    }

    specificDevices = {
        'bmv700': DeviceBmv700,
        'ftpCamera': DeviceFtpCamera,
        'blueSolarMppt75_15': DeviceMpptSolar,
    }

    render () {
        const SpecificDevice = this.specificDevices[this.props.model]

        if (SpecificDevice !== undefined) {
            return <div className="device">
                <SpecificDevice {...this.props}/>
            </div>
        }
        return <p>model: {this.props.model} is not implemented</p>

    }
}

export default Device
