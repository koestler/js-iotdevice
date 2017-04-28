import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ResponsiveGauge from './ResponsiveGauge';
import './ResponsiveGauge.css';
import './Gauge.css';


/**
 * this class is based on the pattern shown in
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

    render = () => <div className={'Gauge ' + this.props.class}/>;
}

class VoltageGauge extends Component {

    static propTypes = {
        value: PropTypes.number.isRequired,
        range: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
    };

    static defaultProps = {
        range: 12
    };

    configuration = {
        ring: {
            minAngle: -90,
            maxAngle: 0,
            colors: ['#E14C4C', '#FFA3AC', '#FFE4E4', '#FFF', '#FFF'],
            border: true,
        },
        data: {
            min: 3 / 4 * this.props.range,
            max: 5 / 4 * this.props.range,
            value: this.props.value,
        },
        labels: {
            number: 6 + 1,
            decimalsMax: 2,
        },
        value: {
            show: true,
            decimalsMax: 2,
            unit: this.props.unit,
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
            type: 'filler',
            colors: 'gradient',
            startColor: '#ff0007',
            endColor: '#00ca1e',
        },
        ring: {
            minAngle: -45,
            maxAngle: +45,
            colors: false,
            border: false,
        },
        data: {
            value: 0,
            min: 0,
            max: 100,
        },
        value: {
            shift: 30,
            decimalsMax: 0,
            unit: '%',
        },
        labels: {
            formatter: (value) => value + '%'
        }
    };

    render = () =>
        <Gauge value={this.props.value}
               configuration={this.configuration}
               class="PercentageGauge"/>;

}

class CurrentGauge extends Component {

    static propTypes = {
        value: PropTypes.number.isRequired,
        range: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
    };

    static defaultProps = {
        range: 3
    };

    configuration = {
        ring: {
            minAngle: -90,
            maxAngle: 90,
            border: true,
        },
        data: {
            min: -this.props.range,
            max: +this.props.range,
            value: 0,
        },
        labels: {
            number: 11,
            decimalsMax: 2
        },
        value: {
            shift: 20,
            decimalsMax: 2,
            unit: this.props.unit
        }
    };

    render = () =>
        <Gauge value={this.props.value}
               configuration={this.configuration}
               class="CurrentGauge"/>;

}

export {Gauge, VoltageGauge, PercentageGauge, CurrentGauge};