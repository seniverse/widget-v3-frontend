import React from 'react'
import styled from 'styled-components'
import { AlarmData } from 'TYPES/Widget'
import AlarmIcon from 'COMPONENTS/base/AlarmIcon'
import Typography from 'COMPONENTS/base/Typography'
import TextScroll from 'COMPONENTS/base/TextScroll'

interface AlarmProps {
  alarm: AlarmData
}

const AlarmContainer = styled.div`
  padding: 0 4px;
`

const Alarm: React.FC<AlarmProps> = props => {
  const { alarm } = props
  const { type, level, description } = alarm

  console.log(alarm)

  return (
    <AlarmContainer>
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
