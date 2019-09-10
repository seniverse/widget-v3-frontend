import React, { useEffect, useState } from 'react'
import AppApi from 'api/app'
import Main from 'CONTAINERS/Main'
import Carousel from 'CONTAINERS/Carousel'
import Tile from 'CONTAINERS/Tile'
import Chart from 'CONTAINERS/Chart'
import { SwLayoutOptions } from 'TYPES/Widget'

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

const UiManager: React.FC = () => {
  const [config, setConfig] = useState<SwLayoutOptions>([])

  const fetchConfig = async () => {
    const res = await AppApi.getConfig()
    if (res && res.success) {
      setConfig(res.results)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

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
