import axios from 'axios'

const API = axios.create({
  baseURL: `https://openexchangerates.org/api/`,
  headers: {
    Authorization: '83b3edabe71b43b79c195101da6833b5',
  },
})

export default API
