import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Row, Col} from 'react-bootstrap';
import DeviceBmv700 from './DeviceBmv700'
import NumericValuesTable from "./NumericValuesTable";
import config from 'react-global-configuration';

class Device extends Component {

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
        axios.get(config.get('apiUrl') + 'device/' + this.props.id)
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
        "bmv700": DeviceBmv700
    };

    render() {
        // render nothing if device data is not present
        if (this.state.deviceData === null) {
            return null;
        }

        const SpecificDevice = this.specificDevices[this.state.deviceData.Type];

        return <Row>
            <Col xs={12} lg={6}>
                <SpecificDevice
                    numericValues={this.state.deviceData.NumericValues}
                />
            </Col>
            <Col xs={12} lg={6}>
                <NumericValuesTable
                    numericValues={this.state.deviceData.NumericValues}
                />
            </Col>
        </Row>

    }
}

export default Device;
