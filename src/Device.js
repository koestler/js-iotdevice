import React, {Component} from 'react';
import DeviceValues from './DeviceValues';
import PropTypes from 'prop-types';
import {Panel} from 'react-bootstrap';


class Device extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            panelOpen: true,
        }

    }

    render() {
        const header =
            <p onClick={() => this.setState({panelOpen: !this.state.panelOpen})}>
                {this.props.id}
            </p>;

        return (
            <Panel header={header}
                   bsStyle="primary"
                   collapsible
                   expanded={this.state.panelOpen}
            >
                {this.state.panelOpen ? <DeviceValues id={this.props.id}/> : null}
            </Panel>
        );
    }
}


export default Device;
