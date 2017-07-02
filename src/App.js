import React, {Component} from 'react';
import axios from 'axios';
import {Grid, Row, Col, PageHeader} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import DeviceWrapper from './DeviceWrapper';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            devices: []
        }

    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/v0/device/')
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
