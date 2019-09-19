import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from 'COMPONENTS/expand/GlobalStyle'
import AppApi from 'api/app'
import { SwPropsConfigOptions, SwLayoutOptions } from 'TYPES/Widget'
import { getTheme } from 'UTILS/theme'
import { getDefaultOptions } from 'UTILS/options'
import OptionProvider from 'COMPONENTS/expand/OptionProvider'
import BubbleBar from './BubbleBar'
import SlimBar from './SlimBar'

interface SwProps {
  data?: SwLayoutOptions
  options?: SwPropsConfigOptions
}

const App: React.FC<SwProps> = props => {
  const { options, data = [] } = props
  const defaultOptions = getDefaultOptions(options)
  const [theme, setTheme] = useState(getTheme(defaultOptions))
  const [config, setConfig] = useState<SwLayoutOptions>(data)

  const fetchConfig = async () => {
    if (Array.isArray(data) && data.length > 0) {
      return
    }

    const res = await AppApi.getConfig()
    if (res && res.success) {
      const newConfig = res.results as SwLayoutOptions
      setTheme(getTheme(getDefaultOptions(options), newConfig))
      setConfig(newConfig)
    }
  }

  const { flavor } = defaultOptions

  useEffect(() => {
    fetchConfig()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <OptionProvider.Provider value={defaultOptions}>
        <GlobalStyle />
        {flavor === 'bubble' && <BubbleBar config={config} />}
        {flavor === 'slim' && <SlimBar config={config} />}
      </OptionProvider.Provider>
    </ThemeProvider>
  )
}

export default App
