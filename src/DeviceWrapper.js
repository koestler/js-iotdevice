import React, {PureComponent} from 'react';
import Device from './Device';
import PropTypes from 'prop-types';
import {Panel, Glyphicon} from 'react-bootstrap';

class DeviceWrapper extends PureComponent {

    static propTypes = {
        id: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        open: PropTypes.bool.isRequired,
        roundedValues: PropTypes.array,
    };

    render() {
        const header = (
            <div onClick="">
                {this.props.id}
                <span className="pull-right">
                    <Glyphicon glyph={'glyphicon glyphicon-eye-' + (this.props.open ? 'close' : 'open')}/>
                </span>
            </div>
        );

        return (
            <Panel header={header}
                   bsStyle="primary"
                   collapsible
                   expanded={this.state.open}
            >
                {this.props.open ? <Device id={this.props.id} model={this.props.model} /> : null}
            </Panel>
        );
    }
}

export default DeviceWrapper;
