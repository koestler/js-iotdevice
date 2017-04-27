import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PercentageGauge, VoltageGauge} from'./Gauge';

class NumericValue extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
    };

    render(props) {
        return (
            <div className="NumericValue">
                {this.props.name}: {this.props.value} {this.props.unit}
                {
                    this.props.name === 'MainVoltage' ?
                        <VoltageGauge
                            key={this.props.name}
                            voltageRange={12}
                            value={this.props.value}/>
                        : null
                }
                {
                    this.props.name === 'StateOfCharge' ?
                        <PercentageGauge
                            key={this.props.name}
                            value={this.props.value}/>
                        : null
                }
            </div>
        );
    };

}

export default NumericValue;
