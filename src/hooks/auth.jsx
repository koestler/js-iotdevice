import React, { useState, useContext, createContext } from 'react'
import axios from 'axios'
import { axiosConfig } from './unauthApi'

// store current token not only in react state but also in localStorage
const authStorage = window.localStorage
const storageKey = 'authenticatedUser'
const storeLoginResponse = loginResponse => {
  authStorage.setItem(storageKey, JSON.stringify(loginResponse))
}
const initialLoginResponse = JSON.parse(authStorage.getItem(storageKey))

// setup react context API
export const authContext = createContext(null)

export const useAuth = () => useContext(authContext)

export function useProvideAuth () {
  const [loginResponse, setLoginResponseState] = useState(initialLoginResponse)

  const setLoginResponse = loginResponse => {
    setLoginResponseState(loginResponse)
    storeLoginResponse(loginResponse)
  }

  const logout = () => setLoginResponse(null)

  const isLoggedIn = () => loginResponse !== null

  const getUser = () => {
    return loginResponse?.user
  }

  const getToken = () => {
    return loginResponse?.token
  }

  const isViewAllowed = view => {
    const allowedViews = loginResponse?.allowedViews || []
    return view.isPublic || allowedViews.includes(view.name)
  }

  const isViewVisible = view => {
    if (!view.hidden) return true
    const allowedViews = loginResponse?.allowedViews || []
    return allowedViews.includes(view.name)
  }

  const api = createApi(getToken(), logout)

  return {
    setLoginResponse,
    logout,
    isLoggedIn,
    getUser,
    getToken,
    isViewAllowed,
    isViewVisible,
    api
  }
}

const createApi = (token, logout) => {
  const api = axios.create(axiosConfig)
  if (token) {
    // inject authorization header if logged in
    api.defaults.headers.common.Authorization = token

    // logout when 401 is returned
    api.interceptors.response.use(r => r, error => {
      if (error.response.status === 401) {
        logout()
      }
      return Promise.reject(error)
    })
  }

  return api
}
