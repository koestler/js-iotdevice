import React from 'react'
import { Row, Col } from 'react-bootstrap'
import GaugeWrapper from './GauageWrapper'
import DeviceNumeric from './DeviceNumeric'
import { CurrentGauge, VoltageGauge } from './Gauge'
import NumericValuesTable from './NumericValuesTable'

class DeviceSolarMppt extends DeviceNumeric {

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
        const ChargerVoltage = values.ChargerVoltage
        const PanelVoltage = values.PanelVoltage
        const ChargerCurrent = values.ChargerCurrent
        const PanelPower = values.PanelPower

        return <Row className="device-bmv">
            <Col xs={12} lg={6}>
                <Row>
                    <Col key="ChargerVoltage" xs={4}>
                        <GaugeWrapper name="ChargerVoltage"
                                      value={ChargerVoltage.Value}
                                      unit={ChargerVoltage.Unit}>
                            <VoltageGauge value={ChargerVoltage.Value}
                                          unit={ChargerVoltage.Unit}
                            />
                        </GaugeWrapper>
                    </Col>
                    <Col key="PanelVoltage" xs={4}>
                        <GaugeWrapper name="PanelVoltage"
                                      value={PanelVoltage.Value}
                                      unit={PanelVoltage.Unit}>
                            <VoltageGauge value={PanelVoltage.Value}
                                          unit={PanelVoltage.Unit}
                            />
                        </GaugeWrapper>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <div onClick={this.toggleShowCurrent}>
                            {this.state.showCurrent ? <GaugeWrapper
                                key="ChargerCurrent"
                                name="ChargerCurrent"
                                value={ChargerCurrent.Value}
                                unit={ChargerCurrent.Unit}>
                                  <CurrentGauge
                                    value={ChargerCurrent.Value}
                                    unit={ChargerCurrent.Unit}
                                  />
                              </GaugeWrapper>
                              : <GaugeWrapper
                                key="PanelPower"
                                name="PanelPower"
                                value={PanelPower.Value}
                                unit={PanelPower.Unit}>
                                  <CurrentGauge
                                    value={PanelPower.Value / 1000}
                                    unit={'k' + PanelPower.Unit}
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

export default DeviceSolarMppt
