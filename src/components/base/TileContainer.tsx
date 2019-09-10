import styled from 'styled-components'
import { gridWidth, gridHeight } from 'UTILS/theme'

interface TileContainerProps {
  row: number
  column: number
}

// TODO: 过滤 props
const TileContainer = styled.div<TileContainerProps>`
  width: ${props => props.column * gridWidth()}px;
  height: ${props => props.row * gridHeight()}px;
`

export default TileContainer
