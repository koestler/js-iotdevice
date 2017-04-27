import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Gauge from'./Gauge';

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
                    this.props.name === 'StateOfCharge' ?
                        <Gauge
                            key={this.props.name}
                            name={this.props.name}
                            value={this.props.value}
                            unit={this.props.unit}/>
                        : null
                }
            </div>
        );
    };

}

export default NumericValue;
