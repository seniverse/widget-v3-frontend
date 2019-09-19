import React from 'react'
import styled from 'styled-components'
import { AlarmData } from 'TYPES/Widget'
import AlarmIcon from 'COMPONENTS/base/AlarmIcon'
import Typography from 'COMPONENTS/base/Typography'
import TextScroll from 'COMPONENTS/base/TextScroll'
import { getAlarmColor } from 'UTILS/theme'

interface AlarmProps {
  alarm: AlarmData
}

interface AlarmContainerProps {
  levelCode: string
}

const AlarmContainer = styled.div<AlarmContainerProps>`
  background-color: ${props => getAlarmColor(`${props.levelCode}`)};
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
      <TextScroll text={[description]} />
    </AlarmContainer>
  )
}

export default Alarm
