import React from 'react'
import styled from 'styled-components'
import { AlarmData } from 'TYPES/Widget'

import AlarmIcon from 'COMPONENTS/base/AlarmIcon'
import Typography from 'COMPONENTS/base/Typography'
import TextScroll from 'COMPONENTS/base/TextScroll'

interface AlarmProps {
  alarm: AlarmData
}

interface AlarmContainerProps {
  levelCode: number
}

const AlarmContent = styled(TextScroll)`
  font-size: 0.75em;
`

const AlarmContainer = styled.div<AlarmContainerProps>`
  background-color: 'transparent';
`

const Alarm: React.FC<AlarmProps> = props => {
  const { alarm } = props
  const { type, level, description, levelCode } = alarm

  return (
    <AlarmContainer levelCode={levelCode}>
      <Typography variant="caption">
        <AlarmIcon alarm={alarm} />
        {type}
        {level}预警
      </Typography>
      <AlarmContent text={[description]} />
    </AlarmContainer>
  )
}

export default Alarm
