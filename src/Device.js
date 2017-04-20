import React, {Component} from 'react';
import NumericValue from './NumericValue';
import axios from 'axios';

class Device extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numericValues: []
        }

    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/v0/device/giumaglio-24v')
            .then(res => {

                const resNumericValues = res.data.NumericValues;

                console.log(resNumericValues);

                const numericValues = [
                    'MainVoltage',
                    'Current',
                    'StateOfCharge'
                ].map(
                    (name) => {
                        let numericValue = resNumericValues[name];
                        console.log(numericValue);
                        numericValue.Name = name;
                        return numericValue;
                    }
                );

                this.setState({numericValues});
            });
    }

    render() {
        return (
            <div className="device">
                <h2>Main Battery</h2>
                <ul>
                    {
                        this.state.numericValues.map(
                            (numericValue) =>
                                <NumericValue
                                    key={numericValue.Name}
                                    name={numericValue.Name}
                                    value={numericValue.Value}
                                    unit={numericValue.Unit}/>
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default Device;
