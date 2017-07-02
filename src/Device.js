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
            roundedValues: null,
        }
    }

    fetchDataFromApi = () => {
        axios.get(config.get('apiUrl') + 'device/' + this.props.id + '/RoundedValues')
            .then(res => {
                this.setState({roundedValues: res.data});
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
        if (this.state.roundedValues === null) {
            return null;
        }

        const SpecificDevice = this.specificDevices[this.props.model];

        return <Row>
            <Col xs={12} lg={6}>
                <SpecificDevice
                    numericValues={this.state.roundedValues}
                />
            </Col>
            <Col xs={12} lg={6}>
                <NumericValuesTable
                    numericValues={this.state.roundedValues}
                />
            </Col>
        </Row>

    }
}

export default Device;
