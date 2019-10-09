import Axios from 'axios'
import qs from 'qs'

const baseURL: string = 'http://localhost:3200/'
const instance = Axios.create({
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(config => {
  if (config.method === 'GET') {
    config.paramsSerializer = params => qs.stringify(params, {
      arrayFormat: 'repeat'
    })
  }
  return config
})

instance.interceptors.response.use(response => {
  return response.data as any
})

export default instance