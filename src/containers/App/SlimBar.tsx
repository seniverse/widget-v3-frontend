import React from 'react'
import styled from 'styled-components'
import Typography from 'COMPONENTS/base/Typography'
import AppContainer from './AppContainer'
import { MainUiLayout } from 'TYPES/Widget'
import { BarProps } from 'TYPES/Bar'
import { getCodeByTime } from 'UTILS/helper'
import AlarmIcon from 'COMPONENTS/base/AlarmIcon'
import UiManager from 'CONTAINERS/UiManager'
import { Transition } from 'react-transition-group'
import Loading from './Loading'
import { scrollbar, checkBy } from 'UTILS/theme'
import CloseButton from './CloseButton'

import env from 'UTILS/env'

const { assetsPath } = env

const SlimBarContainer = styled.div`
  display: inline-flex;
  align-items: center;
  ${checkBy('theme', {
    auto: `color: rgba(0, 0, 0, 0.87)`
  })}
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

  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
    padding: 16px;
    align-content: flex-start;
    overflow-y: auto;
    border-radius: 0;
    ${scrollbar}
  }
`

const UiContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow-x: hidden;
`

const SpaceContainer = styled.div`
  padding-top: 8px;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 3000;

  @media screen and (max-width: 600px) {
    position: fixed;
    left: 0;
    top: 0;
    box-sizing: border-box;
    padding: 0;
    width: 100%;
    height: 100% !important;
    border-radius: 0;
    overflow-y: auto;
    ${scrollbar}
  }
`

const SlimBar: React.FC<BarProps> = props => {
  const { config, options, open, setOpen } = props
  const { hover, theme } = options
  const main = config.find(item => item.UIType === 'main')

  if (main) {
    const data = main.data as MainUiLayout[]
    const { location, temperature, code, sun, alarms } = data[0]

    let icon = (
      <WeatherIcon
        src={`${assetsPath}/assets/img/black/24/${getCodeByTime(
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
          if (document.body.clientWidth > 600 && hover !== 'disabled') {
            setOpen(true)
          }
        }}
        onMouseLeave={() => {
          if (document.body.clientWidth > 600 && hover !== 'always') {
            setOpen(false)
          }
        }}
        onClick={() => {
          if (hover !== 'disabled') {
            setOpen(true)
          }
        }}
        className="sw-container"
      >
        <SlimBarContainer className="sw-bar-slim" theme={theme}>
          <Typography
            variant="body2"
            component="span"
            className="sw-bar-slim-location"
            lineHeight="1.3"
          >
            {location}
          </Typography>
          {icon}

          <Typography
            variant="body2"
            component="span"
            className="sw-bar-slim-temperature"
            lineHeight="1.3"
          >
            {temperature}
          </Typography>
        </SlimBarContainer>
        <Transition in={open} timeout={200}>
          {state =>
            open && (
              <SpaceContainer>
                <CardContainer
                  style={{
                    ...transitionStyles[state]
                  }}
                  className="sw-card-slim-container"
                >
                  <UiContainer className="sw-card-slim-background">
                    {open && hover !== 'always' && (
                      <CloseButton
                        className="sw-card-slim-close"
                        onClick={e => {
                          e.stopPropagation()
                          setOpen(false)
                        }}
                      />
                    )}
                    <UiManager config={config} />
                  </UiContainer>
                </CardContainer>
              </SpaceContainer>
            )
          }
        </Transition>
      </StyledAppContainer>
    )
  } else {
    return <Loading />
  }
}

export default SlimBar
