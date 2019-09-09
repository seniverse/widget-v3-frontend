import React from 'react'
import { UiMainLayoutOption } from 'TYPES/Widget'
import Tile from 'COMPONENTS/base/Tile'

interface CarouselUiProps {
  options: UiMainLayoutOption
}

const Carousel: React.FC<CarouselUiProps> = props => {
  const { options } = props
  const { size } = options
  const [column, row] = size

  return (
    <Tile className="sw-ui-carousel" column={column} row={row}>
      Carousel UI
    </Tile>
  )
}

export default Carousel
