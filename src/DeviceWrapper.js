import React, {Component} from 'react';
import Device from './Device';
import PropTypes from 'prop-types';
import {Panel, Glyphicon} from 'react-bootstrap';

class DeviceWrapper extends Component {

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
        const header = (
            <div onClick={() => this.setState({panelOpen: !this.state.panelOpen})}>
                {this.props.id}
                <span className="pull-right">
                    <Glyphicon glyph={'glyphicon glyphicon-eye-' + (this.state.panelOpen ? 'close' : 'open')}/>
                </span>
            </div>
        );

        return (
            <Panel header={header}
                   bsStyle="primary"
                   collapsible
                   expanded={this.state.panelOpen}
            >
                {this.state.panelOpen ? <Device id={this.props.id}/> : null}
            </Panel>
        );
    }
}

export default DeviceWrapper;
