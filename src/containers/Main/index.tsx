import React from 'react'
import { UiMainLayoutOption } from 'TYPES/Widget'
import Tile from 'COMPONENTS/base/Tile'

interface MainUiProps {
  options: UiMainLayoutOption
}

const Main: React.FC<MainUiProps> = props => {
  const { options } = props
  const { size } = options
  const [column, row] = size

  return (
    <Tile className="sw-ui-main" column={column} row={row}>
      Main UI
    </Tile>
  )
}

export default Main
