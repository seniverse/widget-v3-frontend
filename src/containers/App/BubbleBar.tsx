import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { SwLayoutOptions, MainUiLayout, SwConfigOptions } from 'TYPES/Widget'
import Loading from './Loading'
import Typography from 'COMPONENTS/base/Typography'
import { getCodeByTime } from 'UTILS/helper'
import { Transition } from 'react-transition-group'
import AppContainer from './AppContainer'
import { scrollbar } from 'UTILS/theme'
import UiManager from 'CONTAINERS/UiManager'
import AlarmIcon from 'COMPONENTS/base/AlarmIcon'
import CloseButton from './CloseButton'

import env from 'UTILS/env'

const { assetsPath } = env

interface BubbleBarProps {
  config: SwLayoutOptions
  options: SwConfigOptions
}

const WeatherIcon = styled.img`
  width: 32px;
  height: 32px;
  display: block;
  margin-right: 8px;
  margin-top: 2px;
`

const StyledAppContainer = styled(AppContainer)`
  background: ${props => props.theme.palette.background.default};
  border-radius: 4px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.2s;
  height: 54px;
  width: 100px;
  position: fixed;
  top: 10px;
  left: 10px;
  overflow: hidden;
`

const Container = styled.div`
  padding: 8px;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
`

const UiContainer = styled.div<{ open: boolean }>`
  display: flex;
  height: 100%;
  box-sizing: border-box;
  width: ${props => props.theme.grid.width * 3}px;
  flex-wrap: wrap;
  opacity: ${props => (props.open ? 1 : 0)};
  transition: opacity 200ms ease-in 200ms;
  overflow-x: hidden;
  overflow-y: auto;
  ${scrollbar}

  @media screen and (max-width: 600px) {
    width: 100%;
    height: unset;
  }
`

const ExpandedCard = styled.div<{ h: string; v: string }>`
  background: ${props => props.theme.palette.background.default};
  border-radius: 4px;
  opacity: 0;
  width: ${props => props.theme.grid.width * 3}px;
  transition: width 200ms, height 200ms;
  position: absolute;
  left: ${props => (props.h === 'left' ? '0' : 'unset')};
  right: ${props => (props.h === 'right' ? '0' : 'unset')};
  top: ${props => (props.v === 'top' ? '0' : 'unset')};
  bottom: ${props => (props.v === 'bottom' ? '0' : 'unset')};
  z-index: -1;

  @media screen and (max-width: 600px) {
    position: fixed;
    left: 0;
    top: 0;
    padding: 16px;
    box-sizing: border-box;
    width: 100%;
    height: 100% !important;
    border-radius: 0;
    overflow-y: auto;
    ${scrollbar}
  }
`

const BubbleBar: React.FC<BubbleBarProps> = props => {
  const { config, options } = props
  const { hover } = options
  const ref = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(hover === 'always')
  const [direction, setDirection] = useState({ h: 'left', v: 'top' })
  const [containerBound, setContainerBound] = useState({
    width: 'auto',
    height: 'auto'
  })
  const [barWidth, setBarWidth] = useState('100px')

  const main = config.find(item => item.UIType === 'main')

  const appTransitionStyles = {
    entering: {},
    entered: { overflow: 'unset' },
    exiting: {},
    exited: { width: barWidth },
    unmounted: {}
  }

  const transitionStyles = {
    entering: { opacity: 0, width: barWidth, height: '54px' },
    entered: { opacity: 1, height: containerBound.height },
    exiting: { opacity: 1, height: containerBound.height },
    exited: { opacity: 0, width: barWidth, height: '54px' },
    unmounted: {}
  }

  useEffect(() => {
    const barDom = ReactDOM.findDOMNode(barRef.current) as HTMLDivElement
    const dom = ReactDOM.findDOMNode(ref.current) as HTMLDivElement

    if (barDom && dom) {
      const newBarWidth = `${barDom.clientWidth}px`
      if (newBarWidth !== barWidth) {
        setBarWidth(newBarWidth)
      }
      const bound = barDom.getBoundingClientRect()
      const { left, right, top, bottom } = bound
      const documentWidth = document.body.clientWidth
      const documentHeight = document.body.clientHeight

      let hDirection
      let vDirection
      let maxHeight

      if (left > documentWidth - right) {
        hDirection = 'right'
      } else {
        hDirection = 'left'
      }

      if (top > documentHeight - bottom) {
        vDirection = 'bottom'
        maxHeight = bottom - 10
      } else {
        vDirection = 'top'
        maxHeight = documentHeight - top - 10
      }

      if (direction.h !== hDirection || direction.v !== vDirection) {
        setDirection({
          h: hDirection,
          v: vDirection
        })
      }

      if (dom.scrollWidth && dom.scrollHeight) {
        const min = Math.min(dom.scrollHeight, maxHeight)

        if (
          containerBound.width !== `${dom.scrollWidth}px` ||
          containerBound.height !== `${min}px`
        ) {
          setContainerBound({
            width: `${dom.scrollWidth}px`,
            height: `${min}px`
          })
        }
      }
    }
  })

  if (main) {
    const data = main.data as MainUiLayout[]
    const { location, temperature, code, sun, alarms } = data[0]

    let icon = (
      <WeatherIcon
        src={`${assetsPath}/assets/img/chameleon/56/${getCodeByTime(
          code,
          sun
        )}.svg`}
      />
    )
    if (alarms.length) {
      icon = (
        <AlarmIcon
          alarm={alarms[0]}
          style={{
            width: '32px',
            height: '32px',
            marginRight: '8px',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            borderRadius: '16px'
          }}
        />
      )
    }

    return (
      <Transition in={open} timeout={0}>
        {state => (
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
            style={{
              ...appTransitionStyles[state]
            }}
          >
            <Container className="sw-bar-bubble" ref={barRef}>
              {icon}
              <div>
                <Typography
                  variant="body2"
                  className="sw-bar-bubble-location"
                  lineHeight="1.3"
                >
                  {location}
                </Typography>
                <Typography
                  variant="body2"
                  className="sw-bar-bubble-temperature"
                  lineHeight="1.3"
                >
                  {temperature}
                </Typography>
              </div>
            </Container>

            <Transition in={open} timeout={0}>
              {state => (
                <ExpandedCard
                  h={direction.h}
                  v={direction.v}
                  style={{
                    ...transitionStyles[state]
                  }}
                >
                  <UiContainer ref={ref} open={open}>
                    {open && hover !== 'always' && (
                      <CloseButton
                        src="/assets/img/chameleon/close.svg"
                        onClick={e => {
                          e.stopPropagation()
                          setOpen(false)
                        }}
                      />
                    )}
                    <UiManager config={config} />
                  </UiContainer>
                </ExpandedCard>
              )}
            </Transition>
          </StyledAppContainer>
        )}
      </Transition>
    )
  } else {
    return (
      <StyledAppContainer>
        <Loading />
      </StyledAppContainer>
    )
  }
}

export default BubbleBar
