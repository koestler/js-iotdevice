import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import GaugeWrapper from './GauageWrapper'
import { CurrentGauge, PercentageGauge, VoltageGauge } from './Gauge'
import NumericValuesTable from './NumericValuesTable'
import config from 'react-global-configuration'

class DeviceBmv700 extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
    }

    constructor (props) {
        super(props)

        this.state = {
            roundedValues: null,
            showCurrent: false,
        }
    }

    fetchDataFromApi = () => {
        axios.get(config.get('apiUrl') + 'device/' + this.props.id + '/RoundedValues')
          .then(res => {
              this.setState({roundedValues: res.data})
          })
    }

    componentDidMount () {
        this.fetchDataFromApi()
        const intervalId = setInterval(this.fetchDataFromApi, 2000)
        this.setState({intervalId})
    }

    componentWillUnmount () {
        clearInterval(this.state.intervalId)
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
