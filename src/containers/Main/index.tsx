import React from 'react'
import styled from 'styled-components'
import { MainUiLayout, BaseUiLayoutOption } from 'TYPES/Widget'
import TileContainer from 'COMPONENTS/base/TileContainer'
import Typography from 'COMPONENTS/base/Typography'
import { getCodeByTime, getSunTime } from 'UTILS/helper'
import Alarm from './Alarm'

interface MainUiProps {
  options: BaseUiLayoutOption
}

const StyledTileContainer = styled(TileContainer)`
  padding: 4px 8px 0 8px;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  position: relative;
  margin-bottom: 16px;
  height: 196px;
`

const Grow = styled.div`
  flex: 1 0 auto;
`

const ArcContainer = styled.div`
  width: 100%;
  height: 180px;
  margin: 0 -6px;
  left: 6px;
  position: absolute;
  bottom: 20px;
  overflow: hidden;
`

const Arc = styled.div`
  width: ${props => props.theme.grid.width * 3 * 0.8}px;
  height: ${props => props.theme.grid.width * 3 * 0.8}px;
  position: absolute;
  border-radius: 50%;
  border: 1px dashed ${props => props.theme.palette.divider};
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
`

interface WeatherIconProps {
  left: number
  top: number
  src: string
}

const WeatherIcon = styled.img<WeatherIconProps>`
  width: 54px;
  height: 54px;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  left: ${props => props.left}%;
  top: ${props => props.top}%;
`

const ArrowIcon = styled.img`
  width: 14px;
  height: 14px;
`

const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const InfoTypography = styled(Typography)`
  display: inline-flex;
  flex-direction: row;
  align-items: flex-start;
`

const getPosition = (rise: string, set: string) => {
  const [riseHour, riseMinute] = rise.split(':').map(item => parseInt(item, 10))
  const [setHour, setMinute] = set.split(':').map(item => parseInt(item, 10))

  const riseMinutes = riseHour * 60 + riseMinute
  const setMinutes = setHour * 60 + setMinute

  const now = new Date()
  const nowHour = now.getHours()
  const nowMinute = now.getMinutes()
  const nowMinutes = nowHour * 60 + nowMinute

  let arc = 0

  if (nowMinutes > riseMinutes && nowMinutes < setMinutes) {
    arc = ((setMinutes - nowMinutes) / (setMinutes - riseMinutes)) * Math.PI
  } else if (nowMinutes > setMinutes) {
    arc =
      ((24 * 60 - nowMinutes + riseMinutes) /
        (24 * 60 - setMinutes + riseMinutes)) *
      Math.PI
  } else {
    arc =
      ((riseMinutes - nowMinutes) / (24 * 60 - setMinutes + riseMinutes)) *
      Math.PI
  }

  const left = Math.cos(arc) * 50 + 50
  const top = 50 - Math.sin(arc) * 50

  return {
    left,
    top
  }
}

const Main: React.FC<MainUiProps> = props => {
  const { options } = props
  const { size, data } = options
  const [column, row] = size

  const {
    sun,
    code,
    location,
    temperature,
    text,
    today,
    yesterday,
    updateAt,
    alarms
  } = (data as MainUiLayout[])[0]
  const { low, high } = today
  const { rise, set } = sun
  const { top, left } = getPosition(rise, set)
  const suntimes = getSunTime(sun)

  console.log(alarms)

  let arrowIcon = null
  if (today.high > yesterday.high) {
    arrowIcon = <ArrowIcon src={'/assets/img/arrow-up.svg'} />
  } else if (today.low < yesterday.low) {
    arrowIcon = <ArrowIcon src={'/assets/img/arrow-down.svg'} />
  }

  return (
    <div>
      <StyledTileContainer className="sw-ui-main" column={column} row={row}>
        <ArcContainer>
          <Arc>
            <WeatherIcon
              top={top}
              left={left}
              src={`/assets/img/chameleon/56/${getCodeByTime(code, sun)}.svg`}
            />
          </Arc>
        </ArcContainer>
        <Typography>
          {location}{' '}
          <Typography component="span" variant="caption" color="textSecondary">
            {updateAt}
          </Typography>
        </Typography>
        <Grow />
        <Typography variant="h2" align="center">
          {temperature}
        </Typography>
        <TimeContainer>
          <Typography variant="caption" component="span" color="textSecondary">
            {suntimes.rise}
          </Typography>
          <InfoTypography variant="caption" component="span">
            {text} {low}~{high}
            {arrowIcon}
          </InfoTypography>
          <Typography variant="caption" component="span" color="textSecondary">
            {suntimes.set}
          </Typography>{' '}
        </TimeContainer>
      </StyledTileContainer>
      {alarms.map((alarm, index) => (
        <Alarm alarm={alarm} key={index} />
      ))}
    </div>
  )
}

export default Main
