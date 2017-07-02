import React, {Component} from 'react';
import Device from './Device';
import PropTypes from 'prop-types';
import {Panel, Glyphicon} from 'react-bootstrap';

class DeviceWrapper extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            open: true,
        }
    }

    render() {
        const header = (
            <div onClick={() => this.setState({open: !this.state.open})}>
                {this.props.id}
                <span className="pull-right">
                    <Glyphicon glyph={'glyphicon glyphicon-eye-' + (this.state.open ? 'close' : 'open')}/>
                </span>
            </div>
        );

        return (
            <Panel header={header}
                   bsStyle="primary"
                   collapsible
                   expanded={this.state.open}
            >
                {this.state.open ? <Device id={this.props.id} model={this.props.model} /> : null}
            </Panel>
        );
    }
}

export default DeviceWrapper;
