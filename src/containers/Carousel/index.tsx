import React from 'react'
import { CarouselUI } from 'TYPES/Carousel'
import { BaseUiLayoutOption } from 'TYPES/Widget'
import TileContainer from 'COMPONENTS/base/TileContainer'
import styled from 'styled-components'
import { TileUIContainer } from '../Tile'

const Container = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`

const CarouselContainer = styled(TileContainer)`
  padding: 10px 0;
  overflow-x: auto;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`

const CardWrapper = styled.div`
  height: 100%;
  display: flex;
  position: relative;
`

const Card = styled.div`
  flex: 0 0 38%;
  margin-right: 1%;
  margin-left: 1%;
  border-radius: 2px;
  box-shadow: 1px 1px 20px 0 rgba(24, 24, 24, 0.05);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  transition: all 100ms;

  &:hover {
    box-shadow: 2px 2px 30px 0 rgba(24, 24, 24, 0.19);
  }
`

interface CarouselUiProps {
  options: BaseUiLayoutOption
}

const Carousel: React.FC<CarouselUiProps> = props => {
  const { options } = props
  const { data, size } = options
  const [column, row] = size

  return (
    <CarouselContainer className="sw-ui-carousel" column={column} row={row}>
      <Container>
        <CardWrapper>
          {(data as CarouselUI).map((item, index) => {
            return (
              <Card key={index}>
                <TileUIContainer header={item.header} content={item.content} />
              </Card>
            )
          })}
        </CardWrapper>
      </Container>
    </CarouselContainer>
  )
}

export default Carousel
