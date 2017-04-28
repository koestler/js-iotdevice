import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Table, Glyphicon} from 'react-bootstrap';

class NumericValuesTable extends Component {

    static propTypes = {
        numericValues: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        }
    }

    getNiceName = (name) => name.replace(/([A-Z])/g, ' $1');

    render() {
        const numericValues = this.props.numericValues;
        return (
            <div>
                <Button onClick={() => this.setState({open: !this.state.open})}>
                    <Glyphicon glyph={'glyphicon glyphicon-eye-' + (this.state.open ? 'close' : 'open')}/>
                    &nbsp;Numeric Values
                </Button>
                {this.state.open ?
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>Parameter</th>
                            <th className="text-right">Value</th>
                            <th>Unit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(numericValues).map(
                            (key) =>
                                <tr key={key}>
                                    <td>{this.getNiceName(key)}</td>
                                    <td className="text-right">{numericValues[key].Value}</td>
                                    <td>{numericValues[key].Unit}</td>
                                </tr>
                        )}
                        </tbody>
                    </Table> : null
                }
            </div>
        );
    }
}

export default NumericValuesTable;
