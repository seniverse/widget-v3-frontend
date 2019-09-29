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
    SeniverseWeatherWidgetObject: string
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

const actionDispatcher = function actionDispatcher(
  action: 'show',
  parameters: SwPropsConfigOptions,
  data: SwLayoutOptions
) {
  return (
    SeniverseWeatherWidget[action] &&
    SeniverseWeatherWidget[action](parameters, data)
  )
}

const startFunName =
  window.SeniverseWeatherWidgetObject || 'SeniverseWeatherWidgetObject'

// @ts-ignore
const startFun = window[startFunName]
if (startFun && startFun.q) {
  startFun.q.forEach((parameters: any) => {
    actionDispatcher.apply(window, parameters)
  })
}

// @ts-ignore
window[startFunName] = actionDispatcher

export default SeniverseWeatherWidget
