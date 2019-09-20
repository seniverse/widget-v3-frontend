import axios, { AxiosRequestConfig } from 'axios'
import env from 'UTILS/env'
import { SwConfigOptions } from 'TYPES/Widget'
import { getBrowserLanguage } from 'UTILS/dom'

const { apiHost } = env

const get = async (url: string, config?: AxiosRequestConfig) => {
  const res = await axios.get(url, config)
  if (res && res.data) {
    return res.data
  }
  return null
}

const getConfig = (option: SwConfigOptions) => {
  const { token, unit, language, location, geolocation } = option
  const detected = getBrowserLanguage()

  return get(`${apiHost}/api/weather/${token}`, {
    params: { unit, language, location, geolocation, detected }
  })
}

export default {
  getConfig
}
