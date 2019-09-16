import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyle from 'COMPONENTS/expand/GlobalStyle'
import AppApi from 'api/app'
import {
  SwPropsConfigOptions,
  SwOptionFlavor,
  SwLayoutOptions
} from 'TYPES/Widget'
import UiManager from 'CONTAINERS/UiManager'
import { getTheme, checkBy } from 'UTILS/theme'
import { getDefaultOptions } from 'UTILS/options'
import OptionProvider from 'COMPONENTS/expand/OptionProvider'
import { Transition } from 'react-transition-group'
import BubbleBar from './BubbleBar'

const AppContainer = styled.div<{ flavor: SwOptionFlavor }>`
  background: ${props => props.theme.palette.background.default};
  color: ${props => props.theme.palette.text.primary};
  border-radius: 4px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.2s;
  ${checkBy('flavor', {
    bubble: `
      height: 54px;
      position: fixed;
      top: 10px;
      left: 10px;
    `,
    slim: ``
  })}
`

const ExpandedCard = styled.div`
  flex-wrap: wrap;
  padding: 4px;
  opacity: 0;
  box-sizing: border-box;
  width: ${props => props.theme.grid.width * 3 + 8}px;
  transition: all 200ms 200ms;
  display: flex;
`

interface SwProps {
  options?: SwPropsConfigOptions
}

const App: React.FC<SwProps> = props => {
  const ref = useRef<HTMLDivElement>(null)
  const { options } = props
  const defaultOptions = getDefaultOptions(options)
  const [theme, setTheme] = useState(getTheme(defaultOptions))
  const [config, setConfig] = useState<SwLayoutOptions>([])

  const fetchConfig = async () => {
    const res = await AppApi.getConfig()
    if (res && res.success) {
      const newConfig = res.results as SwLayoutOptions
      setTheme(getTheme(getDefaultOptions(options), newConfig))
      setConfig(newConfig)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  const { flavor } = defaultOptions

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
    exiting: { overflow: 'hidden', height: '54px' },
    exited: { overflow: 'hidden', height: '54px' },
    unmounted: {}
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0, transition: 'none' },
    exited: { opacity: 0, transition: 'none' },
    unmounted: {}
  }

  const [open, setOpen] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <OptionProvider.Provider value={defaultOptions}>
        <Transition in={open} timeout={200}>
          {state => (
            <AppContainer
              onMouseEnter={() => {
                setOpen(true)
              }}
              onMouseLeave={() => {
                setOpen(false)
              }}
              className="sw-container"
              flavor={flavor}
              style={{
                ...appTransitionStyles[state]
              }}
            >
              <GlobalStyle />
              {flavor === 'bubble' && !open && <BubbleBar config={config} />}
              {flavor === 'slim' && !open && '!!'}
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
            </AppContainer>
          )}
        </Transition>
      </OptionProvider.Provider>
    </ThemeProvider>
  )
}

export default App
