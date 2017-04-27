import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ResponsiveGauge from './ResponsiveGauge';
import './ResponsiveGauge.css';

/**
 * todo: this class should be based on the pattern shown in
 * https://github.com/ryanflorence/react-training/blob/gh-pages/lessons/05-wrapping-dom-libs.md
 */

class Gauge extends Component {

    static propTypes = {
        value: PropTypes.number.isRequired,
        configuration: PropTypes.object.isRequired,
        class: PropTypes.string.isRequired,
    };

    componentDidMount() {
        let node = ReactDOM.findDOMNode(this);
        this.gauge = ResponsiveGauge(node, this.props.configuration);
        this.gauge.update(this.props.value);
    }

    componentWillReceiveProps(newProps) {
        this.gauge.update(newProps.value);
    }

    render = () => <div className={this.props.class}/>;
}

class VoltageGauge extends Component {

    static propTypes = {
        value: PropTypes.number.isRequired,
        voltageRange: PropTypes.number.isRequired,
    };

    configuration = {
        ring: {
            minAngle: -90,
            maxAngle: 0,
            colors: ['#E14C4C', '#FFA3AC', '#FFE4E4', '#FFF', '#FFF'],
            border: true
        },
        data: {
            min: 2 / 3 * this.props.voltageRange,
            max: 4 / 3 * this.props.voltageRange,
            value: this.props.value
        },
        labels: {
            number: 4
        },
        value: {
            show: true,
            decimalsMax: 2,
            unit: 'V'
        }
    };

    render = () =>
        <Gauge value={this.props.value}
               configuration={this.configuration}
               class="VoltageGauge"/>;

}

class PercentageGauge extends Component {

    static propTypes = {
        value: PropTypes.number.isRequired,
    };

    configuration = {
        pointer: {
            type: 'filament'
        },
        ring: {
            minAngle: -45,
            maxAngle: 45,
            colors: 'gradient',
            startColor: '#ff0007',
            endColor: '#00ca1e',
            border: true
        },
        data: {
            value: 0,
            min: 0,
            max: 100
        },
        value: {
            shift: 30,
            decimalsMax: 2,
            unit: '%'
        },
        labels: {
            formatter: (value) => value + '%'
        }
    };

    render = () =>
        <Gauge value={this.props.value}
               configuration={this.configuration}
               class="VoltageGauge"/>;

}

export {Gauge, VoltageGauge, PercentageGauge};
export default Gauge;