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

  if (token === '') {
    const error = '请填写 Token'
    alert(`${error}。打开控制台查看更多提示信息`)
    console.error(`错误❌：${error}`)
    console.error(
      '请在 https://www.seniverse.com/widgetv3 内生成插件所需的 token，并将它配置到 window.SeniverseWeatherWidget 方法中'
    )
    console.error(
      '若本地开发调试或自行部署插件前端，建议将 token 配置到环境变量内，并保证能够传入到 App 组件内部'
    )
  }

  return get(`${apiHost}/api/weather/${token}`, {
    params: { unit, language, location, geolocation, detected }
  })
}

export default {
  getConfig
}
