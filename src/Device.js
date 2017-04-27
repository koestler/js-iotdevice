import React, {Component} from 'react';
import NumericValue from './NumericValue';
import PropTypes from 'prop-types';
import axios from 'axios';

class Device extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            numericValues: []
        }

    }

    fetchDataFromApi = () => {
        axios.get('http://localhost:8000/api/v0/device/' + this.props.id)
            .then(res => {
                const resNumericValues = res.data.NumericValues;
                const numericValues = [
                    'MainVoltage',
                    'Current',
                    'StateOfCharge'
                ].map(
                    (name) => {
                        let numericValue = resNumericValues[name];
                        numericValue.Value += Math.random();
                        numericValue.Name = name;
                        return numericValue;
                    }
                );

                this.setState({numericValues});
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

    render() {
        return (
            <div className="device">
                <h2>{ this.props.id }</h2>
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
