import React, { useState } from 'react'
import styled from 'styled-components'
import Typography from 'COMPONENTS/base/Typography'
import AppContainer from './AppContainer'
import { SwLayoutOptions, MainUiLayout } from 'TYPES/Widget'
import { getCodeByTime } from 'UTILS/helper'
import AlarmIcon from 'COMPONENTS/base/AlarmIcon'
import UiManager from 'CONTAINERS/UiManager'
import { Transition } from 'react-transition-group'
import Loading from './Loading'
import env from 'UTILS/env'

const { assetsPath } = env

interface SlimBarProps {
  config: SwLayoutOptions
}

const SlimBarContainer = styled.div`
  display: inline-flex;
  align-items: center;
`

const WeatherIcon = styled.img`
  width: 20px;
  height: 20px;
  display: inline-block;
  margin: 0 8px;
`

const StyledAppContainer = styled(AppContainer)`
  position: relative;
`

const CardContainer = styled.div`
  border-radius: 4px;
  background: ${props => props.theme.palette.background.default};
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.2s;
  overflow: hidden;
  flex-wrap: wrap;
  padding: 0;
  box-sizing: border-box;
  width: ${props => props.theme.grid.width * 3}px;
  display: flex;
`

const SpaceContainer = styled.div`
  padding-top: 8px;
  position: absolute;
  top: 100%;
  left: 0;
`

const SlimBar: React.FC<SlimBarProps> = props => {
  const { config } = props
  const [open, setOpen] = useState(false)
  const main = config.find(item => item.UIType === 'main')

  if (main) {
    const data = main.data as MainUiLayout[]
    const { location, temperature, code, sun, alarms } = data[0]

    let icon = (
      <WeatherIcon
        src={`${assetsPath}/assets/img/chameleon/24/${getCodeByTime(
          code,
          sun
        )}.svg`}
      />
    )
    if (alarms.length) {
      icon = <AlarmIcon alarm={alarms[0]} />
    }

    const transitionStyles = {
      entering: { opacity: 0, display: 'flex' },
      entered: { opacity: 1, display: 'flex' },
      exiting: { opacity: 0, display: 'flex' },
      exited: { opacity: 0, display: 'flex', width: '0', height: '0' },
      unmounted: {}
    }

    return (
      <StyledAppContainer
        onMouseEnter={() => {
          setOpen(true)
        }}
        onMouseLeave={() => {
          setOpen(false)
        }}
      >
        <SlimBarContainer>
          <Typography
            variant="body2"
            component="span"
            className="sw-bar-bubble-location"
            lineHeight="1.3"
          >
            {location}
          </Typography>
          {icon}

          <Typography
            variant="body2"
            component="span"
            className="sw-bar-bubble-temperature"
            lineHeight="1.3"
          >
            {temperature}
          </Typography>

          <Transition in={open} timeout={200}>
            {state => (
              <SpaceContainer>
                <CardContainer
                  style={{
                    ...transitionStyles[state]
                  }}
                >
                  <UiManager config={config} />
                </CardContainer>
              </SpaceContainer>
            )}
          </Transition>
        </SlimBarContainer>
      </StyledAppContainer>
    )
  } else {
    return <Loading />
  }
}

export default SlimBar
