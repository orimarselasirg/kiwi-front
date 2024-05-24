import axios from 'axios'
const { REACT_APP_API } = process.env

// API production
export const api = axios.create({
  baseURL: REACT_APP_API
})

// API develop
/* export const api = axios.create({
  baseURL: REACT_APP_API
})
 */
