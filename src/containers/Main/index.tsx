import React from 'react'
import { BaseUiLayoutOption } from 'TYPES/Widget'
import TileContainer from 'COMPONENTS/base/TileContainer'

interface MainUiProps {
  options: BaseUiLayoutOption
}

const Main: React.FC<MainUiProps> = props => {
  const { options } = props
  const { size } = options
  const [column, row] = size

  return (
    <TileContainer className="sw-ui-main" column={column} row={row}>
      Main UI
    </TileContainer>
  )
}

export default Main
