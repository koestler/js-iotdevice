import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Bmv700 from './Bmv700'

class DeviceValues extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            deviceData: null,
        }
    }

    fetchDataFromApi = () => {
        axios.get('http://localhost:8000/api/v0/device/' + this.props.id)
            .then(res => {
                this.setState({deviceData: res.data});
            });
    };

    componentDidMount() {
        this.fetchDataFromApi();
        const intervalId = setInterval(this.fetchDataFromApi, 2000);
        this.setState({intervalId});
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    specificDevices = {
        "bmv700": Bmv700
    };

    render() {
        // render nothing if device data is not present
        if (this.state.deviceData === null) {
            return null;
        }

        const SpecificDevice = this.specificDevices[this.state.deviceData.Type];

        return <SpecificDevice
            numericValues={this.state.deviceData.NumericValues}
        />;
    }
}

export default DeviceValues;
