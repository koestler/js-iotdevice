import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CurrentGauge, PercentageGauge, VoltageGauge} from'./Gauge';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

class NumericValue extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
    };

    gauges = {
        MainVoltage: VoltageGauge,
        StateOfCharge: PercentageGauge,
        Current: CurrentGauge,
    };

    render(props) {
        const tooltip = (
            <Tooltip id="tooltip"><strong>{this.props.name}</strong>: {this.props.value} {this.props.unit}</Tooltip>
        );

        const Gauge = this.gauges[this.props.name];

        return (
            <OverlayTrigger placement="top" overlay={tooltip}>
                <div className="NumericValue">
                    <Gauge
                        key={this.props.name}
                        value={this.props.value}
                        unit={this.props.unit}
                    />
                </div>
            </OverlayTrigger>
        );
    };

}

export default NumericValue;
