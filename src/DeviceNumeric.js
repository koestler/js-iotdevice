import { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import config from 'react-global-configuration'
import './DeviceNumeric.css'

class DeviceNumeric extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        desc: PropTypes.string
    }

    constructor (props) {
        super(props)

        this.state = {
            roundedValues: null,
        }
    }

    fetchDataFromApi = () => {
        axios.get(config.get('apiUrl') + 'Device/' + this.props.id + '/RoundedValues')
          .then(res => {
              this.setState({roundedValues: res.data})
          })
    }

    componentDidMount () {
        this.fetchDataFromApi()
        const intervalId = setInterval(this.fetchDataFromApi, 1000)
        this.setState({intervalId})
    }

    componentWillUnmount () {
        clearInterval(this.state.intervalId)
    }

}

export default DeviceNumeric
