import React from 'react'
import { Row, Col } from 'react-bootstrap'
import GaugeWrapper from './GauageWrapper'
import DeviceNumeric from './DeviceNumeric'
import { CurrentGauge, PercentageGauge, VoltageGauge } from './Gauge'
import NumericValuesTable from './NumericValuesTable'

class DeviceBmv700 extends DeviceNumeric {

    constructor (props) {
        super(props)

        this.state['showCurrent'] = false
    }

    toggleShowCurrent = () => {
        this.setState({showCurrent: !this.state.showCurrent})
    }

    render () {
        // render nothing if device data is not present
        if (this.state.roundedValues === null) {
            return null
        }

        const values = this.state.roundedValues
        const StateOfCharge = values.StateOfCharge
        const MainVoltage = values.MainVoltage
        const Current = values.Current
        const Power = values.Power

        return <Row className="device-bmv">
            <Col xs={12} lg={6}>
                <Row>
                    <Col key="StateOfCharge" xs={8}>
                        <GaugeWrapper name="State of Charge"
                                      value={StateOfCharge.Value}
                                      unit={StateOfCharge.Unit}>
                            <PercentageGauge value={StateOfCharge.Value}/>
                        </GaugeWrapper>
                    </Col>
                    <Col key="MainVoltage" xs={4}>
                        <GaugeWrapper name="Voltage"
                                      value={MainVoltage.Value}
                                      unit={MainVoltage.Unit}>
                            <VoltageGauge value={MainVoltage.Value}
                                          unit={MainVoltage.Unit}
                            />
                        </GaugeWrapper>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <div onClick={this.toggleShowCurrent}>
                            {this.state.showCurrent ? <GaugeWrapper
                                key="current"
                                name="Current"
                                value={Current.Value}
                                unit={Current.Unit}>
                                  <CurrentGauge
                                    value={Current.Value}
                                    unit={Current.Unit}
                                  />
                              </GaugeWrapper>
                              : <GaugeWrapper
                                key="power"
                                name="Power"
                                value={Power.Value}
                                unit={Power.Unit}>
                                  <CurrentGauge
                                    value={Power.Value / 1000}
                                    unit={'k' + Power.Unit}
                                    range={3}
                                  />
                              </GaugeWrapper>
                            }
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col xs={12} lg={6}>
                <NumericValuesTable
                  numericValues={values}
                />
            </Col>
        </Row>
    }
}

export default DeviceBmv700
