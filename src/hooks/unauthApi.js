import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from './auth'

const api = axios.create({
  baseURL: '/api/v0/',
  headers: { Accept: 'application/json' }
})

export const useConfig = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('config')
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

export const useLogin = () => {
  const { setLoginResponse } = useAuth()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const login = async (user, password) => {
    setSuccess(false)
    setError(false)
    try {
      const response = await api.post('login', { user, password })
      setLoginResponse(response.data)
      setSuccess(true)
    } catch (error) {
      setError(error.response.statusText)
    }
  }

  return { login, success, error }
}

export const imageGenerator = api => async (viewName, cameraName) => {
  try {
    const response = await api.get(
      `images/${viewName}/${cameraName}.jpg`,
      { responseType: 'blob' }
    )
    const p = new Promise(resolve => {
      const reader = new window.FileReader()
      reader.onload = function () {
        resolve({
          blob: this.result,
          nextImageAt: response.headers['x-next-image-at'] || null
        })
      }
      reader.readAsDataURL(response.data)
    })
    return p
  } catch (error) {
    return Promise.reject(error)
  }
}

export const image = imageGenerator(api)
