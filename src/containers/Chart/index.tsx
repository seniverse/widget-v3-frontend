import React from 'react'
import { BaseUiLayoutOption } from 'TYPES/Widget'
import TileContainer from 'COMPONENTS/base/TileContainer'

interface ChartUiProps {
  options: BaseUiLayoutOption
}

const Chart: React.FC<ChartUiProps> = props => {
  const { options } = props
  const { size } = options
  const [column, row] = size

  return (
    <TileContainer className="sw-ui-chart" column={column} row={row}>
      Chart UI
    </TileContainer>
  )
}

export default Chart
