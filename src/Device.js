import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import DeviceBmv700 from './DeviceBmv700'

class Device extends PureComponent {

    static propTypes = {
        id: PropTypes.string.isRequired,
        roundedValues: PropTypes.array,
    };

    specificDevices = {
        "bmv700": DeviceBmv700
    };

    render() {
        // render nothing if device data is not present
        if (this.props.roundedValues === null) {
            return null;
        }

        const SpecificDevice = this.specificDevices[this.props.model];

        return <SpecificDevice
            numericValues={this.props.roundedValues}
        />
    }
}

export default Device;
