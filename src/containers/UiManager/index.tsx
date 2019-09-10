import React, { useEffect, useState } from 'react'
import AppApi from 'api/app'
import Main from 'CONTAINERS/Main'
import Carousel from 'CONTAINERS/Carousel'
import Tile from 'CONTAINERS/Tile'
import Chart from 'CONTAINERS/Chart'
import { SwLayoutOptions, SwTheme, SwPropsConfigOptions } from 'TYPES/Widget'
import { getTheme } from 'UTILS/theme'
import { getDefaultOptions } from 'UTILS/options'

const getUI: (type: string) => React.ElementType = type => {
  switch (type) {
    case 'main':
      return Main
    case 'carousel':
      return Carousel
    case 'tile':
      return Tile
    case 'chart':
      return Chart
    default:
      return () => null
  }
}

interface UiManagerProps {
  setTheme: (theme: SwTheme) => void
  options?: SwPropsConfigOptions
}

const UiManager: React.FC<UiManagerProps> = props => {
  const { setTheme, options } = props
  const [config, setConfig] = useState<SwLayoutOptions>([])

  const fetchConfig = async () => {
    const res = await AppApi.getConfig()
    if (res && res.success) {
      const newConfig = res.results as SwLayoutOptions
      setTheme(getTheme(getDefaultOptions(options), newConfig))
      setConfig(newConfig)
      console.log(newConfig)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  console.log(config)

  return (
    <>
      {config.map((item, index) => {
        const { UIType } = item
        const Component = getUI(UIType)

        return <Component key={index} options={item} />
      })}
    </>
  )
}

export default UiManager
