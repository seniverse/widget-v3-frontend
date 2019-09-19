import React from 'react'
import { SwPropsConfigOptions, SwLayoutOptions } from 'TYPES/Widget'
import ReactDOM from 'react-dom'
import App from 'CONTAINERS/App'
import { getDefaultOptions } from 'UTILS/options'

declare global {
  interface Window {
    SeniverseWeatherWidget: {
      show: (options: SwPropsConfigOptions, data?: SwLayoutOptions) => void
    }
  }
}

const SeniverseWeatherWidget = {
  show: (options: SwPropsConfigOptions, data?: SwLayoutOptions) => {
    const defaultOptions = getDefaultOptions(options)
    const { container } = defaultOptions
    ReactDOM.render(
      <App options={defaultOptions} data={data} />,
      document.getElementById(container)
    )
  }
}

window.SeniverseWeatherWidget = SeniverseWeatherWidget

export default SeniverseWeatherWidget
