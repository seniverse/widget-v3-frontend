import styled from 'styled-components'
import { gridHeight } from 'UTILS/theme'

interface TileContainerProps {
  row: number
  column: number
}

// TODO: 过滤 props
const TileContainer = styled.div<TileContainerProps>`
  flex: 1 0 ${props => props.column * 33.333}%;
  height: ${props => props.row * gridHeight()}px;
  max-width: 100%;
`

export default TileContainer
