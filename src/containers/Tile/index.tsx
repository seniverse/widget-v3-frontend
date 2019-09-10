import React from 'react'
import { BaseUiLayout, BaseUiLayoutOption } from 'TYPES/Widget'
import TileContainer from 'COMPONENTS/base/TileContainer'
import styled from 'styled-components'

interface TileUiProps {
  options: BaseUiLayoutOption
}

const StyledTileContainer = styled(TileContainer)`
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 1px;
    height: 40px;
    background: #f00;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  &:nth-child(3n + 1) {
    &::after {
      display: none;
    }
  }
`

const Container = styled.div`
  padding: 8px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`

const Tile: React.FC<TileUiProps> = props => {
  const { options } = props
  const { size, data } = options
  const [column, row] = size

  const { header, content } = (data as BaseUiLayout[])[0]
  console.log(content)

  return (
    <StyledTileContainer className="sw-ui-tile" column={column} row={row}>
      <Container className="sw-ui-tile-container">{header}</Container>
    </StyledTileContainer>
  )
}

export default Tile
