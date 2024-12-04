import axios from 'axios'

import { loadState } from 'helpers'
import store from '_redux/store'
import { expired } from '_redux/actions'

axios.defaults.mode = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.REACT_APP_TOKEN_API}`

axios.interceptors.request.use(
  config => {
    const { access_token, token_type } = loadState('token') || {}
    const { REACT_APP_URL_API } = loadState('app') || {}

    config.baseURL = REACT_APP_URL_API

    if (access_token) {
      config.headers.Authorization = `${token_type} ${access_token}`
      config.headers.WithCredentials = true
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = undefined
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    const { access_token } = loadState('token') || {}
    if (response.status === 401 && access_token) {
      store.dispatch(expired())
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
