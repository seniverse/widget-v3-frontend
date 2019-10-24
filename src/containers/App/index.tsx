import React, { useState, useEffect } from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import AppApi from 'api/app'
import { SwConfigOptions, SwLayoutOptions } from 'TYPES/Widget'
import { getTheme } from 'UTILS/theme'
import OptionProvider from 'COMPONENTS/expand/OptionProvider'

import Bars from 'CONTAINERS/Bars'

interface SwProps {
  data?: SwLayoutOptions
  options: SwConfigOptions
}

const OpenStyle = createGlobalStyle`
  body {
    @media screen and (max-width: 600px) {
      overflow-y: hidden;
    }
  }
`

const App: React.FC<SwProps> = props => {
  const { options, data = [] } = props
  const { hover } = options
  const [open, setOpen] = useState(hover === 'always')

  const [theme, setTheme] = useState(getTheme(options, data))
  const [config, setConfig] = useState<SwLayoutOptions>(data)

  const fetchConfig = async () => {
    if (Array.isArray(data) && data.length > 0) {
      return
    }

    const res = await AppApi.getConfig(options)
    if (res && res.success) {
      const newConfig = res.results as SwLayoutOptions
      setTheme(getTheme(options, newConfig))
      setConfig(newConfig)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <OptionProvider.Provider value={options}>
        {open && <OpenStyle />}
        <Bars config={config} options={options} open={open} setOpen={setOpen} />
      </OptionProvider.Provider>
    </ThemeProvider>
  )
}

export default App
