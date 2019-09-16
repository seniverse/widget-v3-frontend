import React from 'react'
import { BaseUiLayout, BaseUiLayoutOption } from 'TYPES/Widget'
import TileContainer from 'COMPONENTS/base/TileContainer'
import Typography from 'COMPONENTS/base/Typography'
import styled from 'styled-components'

interface TileUiProps {
  options: BaseUiLayoutOption
  rightBorderInvisiable: boolean
}

interface TileContentProps {
  header: string
  content: {
    text: string
    type?: string
    suffix?: string
    prefix?: string
  }[]
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

const Icon = styled.img`
  width: 32px;
  height: 32px;
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

const TypographyWrapper = styled(Typography)`
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
`

const TypographyIconWrapper = styled(TypographyWrapper)`
  align-items: flex-end;
`

const renderTileContent = (
  key: string,
  content: {
    suffix?: string
    prefix?: string
    type?: string
    text: string
  }
) => {
  const Component =
    content.type === 'icon' ? TypographyIconWrapper : TypographyWrapper

  return (
    <Component key={key} variant="h3" className="sw-ui-tile-text" noWrap>
      <Typography
        variant="caption"
        className="sw-ui-tile-prefix"
        component="span"
      >
        {content.prefix || ''}
      </Typography>
      {content.type === 'icon' ? (
        <Icon src={`/assets/img/chameleon/56/${content.text}.svg`} />
      ) : (
        content.text
      )}
      <Typography
        variant="caption"
        className="sw-ui-tile-suffix"
        component="span"
      >
        {content.suffix || ''}
      </Typography>
    </Component>
  )
}

export const TileUIContainer: React.FC<TileContentProps> = props => {
  const { header, content } = props
  return (
    <Container className="sw-ui-tile-container">
      <Typography variant="caption" className="sw-ui-tile-header" noWrap>
        {header}
      </Typography>
      {renderTileContent(`${0}`, content[0])}
    </Container>
  )
}

const Tile: React.FC<TileUiProps> = props => {
  const { options, rightBorderInvisiable } = props
  const { size, data } = options
  const [column, row] = size

  const { header, content } = (data as BaseUiLayout[])[0]
  const Component = rightBorderInvisiable
    ? StyledTileContainerWithoutBorder
    : StyledTileContainer

  return (
    <Component className="sw-ui-tile" column={column} row={row}>
      <TileUIContainer header={header} content={content} />
    </Component>
  )
}

export default Tile
