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
    themeOption = {},
    container = 'tp-weather-widget',
    token = '',
    hover = 'enabled',
    assetsPath
  } = options

  return {
    flavor,
    location,
    geolocation,
    language,
    unit,
    theme,
    themeOption,
    container,
    token,
    hover,
    assetsPath
  }
}
