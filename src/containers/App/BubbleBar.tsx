import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { SwLayoutOptions, MainUiLayout } from 'TYPES/Widget'
import Loading from './Loading'
import Typography from 'COMPONENTS/base/Typography'
import { getCodeByTime } from 'UTILS/helper'
import { Transition } from 'react-transition-group'
import AppContainer from './AppContainer'
import UiManager from 'CONTAINERS/UiManager'

interface BubbleBarProps {
  config: SwLayoutOptions
}

const Container = styled.div`
  padding: 8px;
  display: flex;
  width: fit-content;
`

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
  transform: translateZ(0);
  height: 54px;
  width: 100px;
  position: fixed;
  top: 10px;
  left: 10px;
  overflow: hidden;
`

const ExpandedCard = styled.div`
  flex-wrap: wrap;
  padding: 0;
  opacity: 0;
  box-sizing: border-box;
  width: ${props => props.theme.grid.width * 3}px;
  transition: all 200ms 200ms;
  display: flex;
`

const BubbleBar: React.FC<BubbleBarProps> = props => {
  const { config } = props
  const ref = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [barWidth, setBarWidth] = useState('100px')

  const main = config.find(item => item.UIType === 'main')

  let width = 'auto'
  let height = 'auto'

  const dom = ReactDOM.findDOMNode(ref.current) as HTMLDivElement
  if (dom) {
    width = `${dom.clientWidth}px`
    height = `${dom.clientHeight}px`
  }

  const appTransitionStyles = {
    entering: { width, height },
    entered: { width, height },
    exiting: { overflow: 'hidden', height: '54px', width: barWidth },
    exited: { overflow: 'hidden', height: '54px', width: barWidth },
    unmounted: {}
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0, transition: 'none' },
    exited: { opacity: 0, transition: 'none' },
    unmounted: {}
  }

  useEffect(() => {
    const barDom = ReactDOM.findDOMNode(barRef.current) as HTMLDivElement
    if (barDom) {
      const newBarWidth = `${barDom.clientWidth}px`
      if (newBarWidth !== barWidth) {
        setBarWidth(newBarWidth)
      }
    }
  })

  if (main) {
    const data = main.data as MainUiLayout[]
    const { location, temperature, code, sun } = data[0]
    return (
      <Transition in={open} timeout={200}>
        {state => (
          <StyledAppContainer
            onMouseEnter={() => {
              setOpen(true)
            }}
            onMouseLeave={() => {
              setOpen(false)
            }}
            className="sw-container"
            style={{
              ...appTransitionStyles[state]
            }}
          >
            {!open && (
              <Container className="sw-bar-bubble" ref={barRef}>
                <WeatherIcon
                  src={`/assets/img/chameleon/56/${getCodeByTime(
                    code,
                    sun
                  )}.svg`}
                />
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
            )}

            <Transition in={open} timeout={200}>
              {state => (
                <ExpandedCard
                  ref={ref}
                  style={{
                    ...transitionStyles[state]
                  }}
                >
                  <UiManager config={config} />
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
