import React from 'react'
import { CarouselUI } from 'TYPES/Carousel'
import { BaseUiLayoutOption } from 'TYPES/Widget'
import TileContainer from 'COMPONENTS/base/TileContainer'
import styled from 'styled-components'

// const Container = styled.div`
//   height: 100%;
//   width: 100%;
//   overflow-y: auto;
// `

const Card = styled.div`
  box-shadow: 1px 1px 20px rgba(24, 24, 24, 0.5);
`

interface CarouselUiProps {
  options: BaseUiLayoutOption
}

const Carousel: React.FC<CarouselUiProps> = props => {
  const { options } = props
  const { data, size } = options
  const [column, row] = size

  return (
    <TileContainer className="sw-ui-carousel" column={column} row={row}>
      {(data as CarouselUI).map((item, index) => (
        <Card key={index}>123</Card>
      ))}
    </TileContainer>
  )
}

export default Carousel
