import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

class GauageWrapper extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
    };

    render(props) {
        const tooltip = (
            <Tooltip id="tooltip"><strong>{this.props.name}</strong>: {this.props.value} {this.props.unit}</Tooltip>
        );

        return (
            <OverlayTrigger placement="top" overlay={tooltip}>
                <div className="NumericValue">
                    {this.props.children}
                </div>
            </OverlayTrigger>
        );
    };

}

export default GauageWrapper;
