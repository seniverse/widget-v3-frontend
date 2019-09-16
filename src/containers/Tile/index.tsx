import React from 'react'
import { BaseUiLayout, BaseUiLayoutOption } from 'TYPES/Widget'
import TileContainer from 'COMPONENTS/base/TileContainer'
import Typography from 'COMPONENTS/base/Typography'
import styled from 'styled-components'

interface TileUiProps {
  options: BaseUiLayoutOption
  rightBorderInvisiable: boolean
}

const StyledTileContainer = styled(TileContainer)`
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 1px;
    height: 40px;
    background: ${props => props.theme.palette.divider};
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`

const StyledTileContainerWithoutBorder = styled(StyledTileContainer)`
  &::after {
    display: none;
  }
`

const Container = styled.div`
  padding: 16px 8px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-sizing: border-box;
`

const Tile: React.FC<TileUiProps> = props => {
  const { options, rightBorderInvisiable } = props
  const { size, data } = options
  const [column, row] = size

  const { header, content } = (data as BaseUiLayout[])[0]
  const { suffix, text } = content[0]
  const Component = rightBorderInvisiable
    ? StyledTileContainerWithoutBorder
    : StyledTileContainer

  return (
    <Component className="sw-ui-tile" column={column} row={row}>
      <Container className="sw-ui-tile-container">
        <Typography variant="caption" className="sw-ui-tile-header" noWrap>
          {header}
        </Typography>
        <Typography variant="h3" className="sw-ui-tile-text" noWrap>
          {text}
          <Typography
            variant="caption"
            className="sw-ui-tile-suffix"
            component="span"
          >
            {' '}
            {suffix}
          </Typography>
        </Typography>
      </Container>
    </Component>
  )
}

export default Tile
