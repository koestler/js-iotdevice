import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
            </div>
        );
    };

}

export default NumericValue;
