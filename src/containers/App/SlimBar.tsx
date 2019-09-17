import React, { useState } from 'react'
import styled from 'styled-components'
import Typography from 'COMPONENTS/base/Typography'
import AppContainer from './AppContainer'
import { SwLayoutOptions, MainUiLayout } from 'TYPES/Widget'
import { getCodeByTime } from 'UTILS/helper'
import UiManager from 'CONTAINERS/UiManager'
import { Transition } from 'react-transition-group'

interface SlimBarProps {
  config: SwLayoutOptions
}

const SlimBarContainer = styled.div`
  display: inline-flex;
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
  transform: translateZ(0);
  overflow: hidden;
  flex-wrap: wrap;
  padding: 4px;
  box-sizing: border-box;
  width: ${props => props.theme.grid.width * 3 + 8}px;
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
    const { location, temperature, code, sun } = data[0]

    const transitionStyles = {
      entering: { opacity: 0, display: 'flex' },
      entered: { opacity: 1, display: 'flex' },
      exiting: { opacity: 0, display: 'flex' },
      exited: { opacity: 0, display: 'none' },
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
          <WeatherIcon
            src={`/assets/img/chameleon/24/${getCodeByTime(code, sun)}.svg`}
          />

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
    return <div>?</div>
  }
}

export default SlimBar
