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
        let el = ReactDOM.findDOMNode(this);
        let gauge = ResponsiveGauge(el, this.props.configuration);
        gauge.update(this.props.value);
    }

    render() {
        return (
            <div className={this.props.class}></div>
        );
    };

}

class VoltageGauge extends Component {

    static propTypes = {
        value: PropTypes.number.isRequired,
        voltageRange: PropTypes.number.isRequired,
    };

    render() {
        const configuration = {
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

        return (
            <Gauge value={this.props.value}
                   configuration={configuration}
                   class="VoltageGauge"/>
        )

    }
}

export {Gauge, VoltageGauge};
export default Gauge;