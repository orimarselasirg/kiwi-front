import axios from 'axios'
import { loadState } from 'utilities'
const { REACT_APP_API } = process.env

// API production
export const api = axios.create({
  baseURL: REACT_APP_API,
  headers: {
    organization_id: '665293f54b7230aaad1fb510'
    // token: localStorage.getItem('token')
  }
})

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token')
  const user = loadState('user')
  if (token && user) {
    config.headers = {
      ...config.headers,
      token,
      organization_id: user.organizationData.id,
      'Content-Type': 'application/json',
      Accept: '*/*'
    }
  }
  return config
}, (error) => {
  Promise.reject(error)
})

// API develop
/* export const api = axios.create({
  baseURL: REACT_APP_API
})
 */
