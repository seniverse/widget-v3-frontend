import React from 'react'
import { BaseUiLayoutOption } from 'TYPES/Widget'
import TileContainer from 'COMPONENTS/base/TileContainer'

interface CarouselUiProps {
  options: BaseUiLayoutOption
}

const Carousel: React.FC<CarouselUiProps> = props => {
  const { options } = props
  const { size } = options
  const [column, row] = size

  return (
    <TileContainer className="sw-ui-carousel" column={column} row={row}>
      Carousel UI
    </TileContainer>
  )
}

export default Carousel
