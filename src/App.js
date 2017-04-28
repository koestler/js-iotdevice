import React, {Component} from 'react';
import axios from 'axios';
import {Grid, Row, Col, PageHeader} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';

import Device from './Device';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deviceIds: []
        }

    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/v0/device/')
            .then(res => {
                const deviceIds = res.data;
                this.setState({deviceIds});
            });
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col>
                        <PageHeader>Giumaglio <small>Dashboard</small></PageHeader>
                    </Col>
                </Row>
                <Col>
                    {this.state.deviceIds.map(
                        deviceId => <Device key={deviceId} id={deviceId}/>
                    )}
                </Col>
            </Grid>
        );
    }
}

export default App;
