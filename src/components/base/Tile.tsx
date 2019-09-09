import styled from 'styled-components'
import { gridWidth } from 'UTILS/theme'

interface TileProps {
  row: number
  column: number
}

// TODO: 过滤 props
const Tile = styled.div<TileProps>`
  width: ${props => props.column * gridWidth()}px;
`

export default Tile
