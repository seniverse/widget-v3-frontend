import React from 'react'
import { BarProps } from 'TYPES/Bar'

import BubbleBar from './BubbleBar'
import SlimBar from './SlimBar'
import PerformanceBar from './PerformanceBar'

const Bars: React.FC<BarProps> = props => {
  const { options } = props
  const { flavor } = options

  switch (flavor) {
    case 'bubble':
      return <BubbleBar {...props} />
    case 'slim':
      return <SlimBar {...props} />
    case 'performance':
      return <PerformanceBar {...props} />
    default:
      return <></>
  }
}

export default Bars
