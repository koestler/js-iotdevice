import React, {Component} from 'react';
import './App.css';

import Device from './Device';

class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1>Giumaglio Dashboard</h1>
                </div>
                <Device/>
            </div>
        );
    }
}

export default App;
