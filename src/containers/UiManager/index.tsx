import React from 'react'
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
  let preSize = 0

  return (
    <>
      {config.map((item, index) => {
        const { UIType, size } = item
        let rightBorderInvisiable = false
        const totalWidth = preSize + size[0]

        if (totalWidth >= 3) {
          rightBorderInvisiable = true
          preSize = 0
        } else {
          if (index === config.length - 1) {
            rightBorderInvisiable = true
          } else {
            const nextWidth = config[index + 1].size[0] + totalWidth
            rightBorderInvisiable = nextWidth > 3
            preSize = nextWidth > 3 ? 0 : totalWidth
          }
        }

        const Component = getUI(UIType)

        return (
          <Component
            key={index}
            options={item}
            rightBorderInvisiable={rightBorderInvisiable}
          />
        )
      })}
    </>
  )
}

export default UiManager
