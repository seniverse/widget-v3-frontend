import React, { useState } from 'react'
import { CarouselUILayout } from 'TYPES/Carousel'
import { BaseUiLayoutOption } from 'TYPES/Widget'
import TileContainer from 'COMPONENTS/base/TileContainer'
import styled from 'styled-components'
import { TileUIContainer } from '../Tile'
import { gridWidth } from 'UTILS/theme'
import SvgIcon from 'COMPONENTS/base/SvgIcon'

const Container = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
`

const CarouselContainer = styled(TileContainer)`
  padding: 10px 0;
  overflow-x: hidden;
  overflow-y: hidden;
  box-sizing: content-box;

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 600px) {
    overflow-x: auto;
    overflow-y: hidden;
  }
`

const IconWrapper = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: 600px) {
    display: none;
  }
`

const Icon = styled(SvgIcon)`
  width: 10px;
  height: 10px;
`

const CardWrapper = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  transition: left 100ms;
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
  const { size } = options
  const [column, row] = size
  const [offset, setOffset] = useState(0)
  const data = options.data as CarouselUILayout[]

  return (
    <CarouselContainer className="sw-ui-carousel" column={column} row={row}>
      <Container className="sw-ui-carousel-container">
        <CardWrapper
          style={{
            left: -gridWidth() * 3 * 0.38 * offset
          }}
          className="sw-ui-carousel-wrapper"
        >
          {data.map((item, index) => {
            return (
              <Card key={index} className="sw-ui-carousel-item">
                <TileUIContainer header={item.header} content={item.content} />
              </Card>
            )
          })}
        </CardWrapper>
        <IconWrapper
          style={{ left: '5px' }}
          onClick={() => setOffset(Math.max(0, offset - 1))}
        >
          <Icon name="arrow-left" />
        </IconWrapper>
        <IconWrapper
          style={{ right: '5px' }}
          onClick={() => setOffset(Math.min(data.length - 1, offset + 1))}
        >
          <Icon name="arrow-right" />
        </IconWrapper>
      </Container>
    </CarouselContainer>
  )
}

export default Carousel
