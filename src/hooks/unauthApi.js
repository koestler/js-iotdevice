import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from './auth'

export const axiosConfig = {
  baseURL: '/api/v1/',
  headers: { Accept: 'application/json' }
}
export const unauthApi = axios.create(axiosConfig)

export const useConfig = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await unauthApi.get('config')
        setData(response.data)
        setSuccess(true)
      } catch (error) {
        setError(error.response.statusText)
      }
    }
    fetchData()
  }, [])

  return { config: data, success, error }
}

export const useLogin = ({ onSucces, onError }) => {
  const { setLoginResponse } = useAuth()

  const login = async (user, password) => {
    try {
      const response = await unauthApi.post('login', { user, password })
      setLoginResponse(response.data)
      onSucces(user)
    } catch (error) {
      onError()
    }
  }

  return { login }
}

export const useCategories = (api, viewName, deviceName) => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`registers/${viewName}/${deviceName}.json`)
        setData(mapRegistersToCategories(response.data))
        setSuccess(true)
      } catch (error) {
          setError(true)
      }
    }
    fetchData()
  }, [api, viewName, deviceName])

  return { categories: data, success, error }
}

const mapRegistersToCategories = registers => (
  registers.map(r => r.category)
    .filter((v, i, a) => a.indexOf(v) === i) // each category just once
    .sort(a => a === 'Essential' ? -1 : 0) // reorder Essential to the front, the rest unchanged
    .map(category => ({
      category,
      registers: registers.filter(r => r.category === category)
    })) // group registers by categories
)

export const useValues = (api, viewName, deviceName) => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`values/${viewName}/${deviceName}.json`)
        setData(response.data)
        setSuccess(true)
      } catch (error) {
        setError(error.response.statusText)
      }
    }
    fetchData()
  }, [api, viewName, deviceName])

  return { values: data, success, error }
}
