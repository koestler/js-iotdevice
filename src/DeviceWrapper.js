import React, { Component } from 'react'
import Device from './Device'
import PropTypes from 'prop-types'
import { Panel, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap'
import './DeviceWrapper.css'

class DeviceWrapper extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        name: PropTypes.string,
    }

    constructor (props) {
        super(props)

        this.state = {
            open: true,
        }
    }

    render () {
        let title = this.props.id
        if (this.props.name !== undefined) {
            const tooltip = (
              <Tooltip id="tooltip">{this.props.id}</Tooltip>
            )

            title = <OverlayTrigger placement="top" overlay={tooltip}>
                <span>{this.props.name}</span>
            </OverlayTrigger>
        }

        const header = (
          <div onClick={() => this.setState({open: !this.state.open})}>
              {title}
              <span className="pull-right">
                    <Glyphicon glyph={'glyphicon glyphicon-eye-' + (this.state.open ? 'close' : 'open')}/>
                </span>
          </div>
        )

        return (
          <Panel header={header}
                 className="device"
                 bsStyle="primary"
                 collapsible
                 expanded={this.state.open}
          >
              {this.state.open ? <Device {...this.props} /> : null}
          </Panel>
        )
    }
}

export default DeviceWrapper
