import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ResponsiveGauge from './ResponsiveGauge';
import './ResponsiveGauge.css';

class Gauge extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
    };

    componentDidMount() {
        let el = ReactDOM.findDOMNode(this);
        ResponsiveGauge(el, {});
    }

    render(props) {
        return (
            <div className="Gauge"></div>
        );
    };

}

export default Gauge;
