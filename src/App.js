import React, {Component} from 'react';
import axios from 'axios';
import {Grid, Row, Col, PageHeader} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import DeviceWrapper from './DeviceWrapper';
import config from 'react-global-configuration';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            devices: []
        }

    }

    componentDidMount() {
        console.log(config.get('apiUrl'));
        axios.get(config.get('apiUrl') + 'device/')
            .then(res => {
                const devices = res.data;
                this.setState({devices});
            });
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col>
                        <PageHeader>Giumaglio <small>ve-sensors Dashboard</small></PageHeader>
                    </Col>
                </Row>
                <Col>
                    {this.state.devices.map(
                        device => <DeviceWrapper key={device.Name} id={device.Name} model={device.Model} />
                    )}
                </Col>
            </Grid>
        );
    }
}

export default App;
