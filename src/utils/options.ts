import { SwPropsConfigOptions, SwConfigOptions } from 'TYPES/Widget'

export const getDefaultOptions: (
  options?: SwPropsConfigOptions
) => SwConfigOptions = (options = { token: '' }) => {
  const {
    flavor = 'bubble',
    location = '',
    geolocation = true,
    language = 'zh-Hans',
    unit = 'c',
    theme = 'light',
    container = 'tp-weather-widget',
    token = '',
    hover = 'enabled'
  } = options

  return {
    flavor,
    location,
    geolocation,
    language,
    unit,
    theme,
    container,
    token,
    hover
  }
}
