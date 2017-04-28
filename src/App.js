import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
//import {Row} from 'react-bootstrap';

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
            <div>
                <div className="App">
                    <div className="App-header">
                        <h1>Giumaglio Dashboard</h1>
                    </div>
                    {
                        this.state.deviceIds.map(
                            deviceId => <Device key={deviceId} id={deviceId}/>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default App;
