import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, Table, Glyphicon} from 'react-bootstrap';

class NumericValuesTable extends PureComponent {

    static propTypes = {
        numericValues: PropTypes.object.isRequired,
        open: PropTypes.bool.isRequired,
    };

    getNiceName = (name) => name.replace(/([A-Z])/g, ' $1');

    render() {
        const numericValues = this.props.numericValues;
        return (
            <div>
                <Button onClick="">
                    <Glyphicon glyph={'glyphicon glyphicon-eye-' + (this.props.open ? 'close' : 'open')}/>
                    &nbsp;Numeric Values
                </Button>
                {this.props.open ?
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
