import React, { memo } from 'react'
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

interface UiManagerProps {
  config: SwLayoutOptions
}

const UiManager: React.FC<UiManagerProps> = props => {
  const { config } = props

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

export default memo(UiManager)
