import React from 'react'
import { BaseUiLayout, BaseUiLayoutOption } from 'TYPES/Widget'
import TileContainer from 'COMPONENTS/base/TileContainer'
import Typography from 'COMPONENTS/base/Typography'
import styled from 'styled-components'
import env from 'UTILS/env'

const { assetsPath } = env

interface TileUiProps {
  options: BaseUiLayoutOption
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

  &::before,
  &::after {
    content: '';
    display: block;
    width: 0.5px;
    height: 40px;
    background: ${props => props.theme.palette.divider};
    position: absolute;
    right: -0.5px;
    top: 50%;
    transform: translateY(-50%);
  }

  &::before {
    left: -0.5px;
  }
`

const Icon = styled.img`
  width: 32px;
  height: 32px;
`

const Container = styled.div`
  padding: 16px 12px;
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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: -3px;
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
      {content.prefix && (
        <Typography
          variant="caption"
          className="sw-ui-tile-text-prefix"
          component="span"
        >
          {content.prefix}
        </Typography>
      )}
      {content.type === 'icon' ? (
        <Icon
          className="sw-ui-tile-text-icon"
          src={`${assetsPath}/assets/img/chameleon/56/${content.text}.svg`}
        />
      ) : (
        content.text
      )}
      {content.suffix && (
        <Typography
          variant="caption"
          className="sw-ui-tile-text-suffix"
          component="span"
        >
          {content.suffix}
        </Typography>
      )}
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
      <ContentContainer className="sw-ui-tile-content">
        {content.map((c, index) => renderTileContent(`${index}`, c))}
      </ContentContainer>
    </Container>
  )
}

const Tile: React.FC<TileUiProps> = props => {
  const { options } = props
  const { size, data } = options
  const [column, row] = size

  const { header, content } = (data as BaseUiLayout[])[0]

  return (
    <StyledTileContainer className="sw-ui-tile" column={column} row={row}>
      <TileUIContainer header={header} content={content} />
    </StyledTileContainer>
  )
}

export default Tile
