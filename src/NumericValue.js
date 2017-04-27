import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CurrentGauge, PercentageGauge, VoltageGauge} from'./Gauge';

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
                            range={12}
                            value={this.props.value}
                            unit={this.props.unit}/>
                        : null
                }
                {
                    this.props.name === 'StateOfCharge' ?
                        <PercentageGauge
                            key={this.props.name}
                            value={this.props.value}/>
                        : null
                }
                {
                    this.props.name === 'Current' ?
                        <CurrentGauge
                            key={this.props.name}
                            range={3}
                            value={this.props.value}
                            unit={this.props.unit}/>
                        : null
                }
            </div>
        );
    };

}

export default NumericValue;
