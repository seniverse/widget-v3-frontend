import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyle from 'COMPONENTS/expand/GlobalStyle'
import { SwPropsConfigOptions } from 'TYPES/Widget'
import UiManager from 'CONTAINERS/UiManager'
import { getTheme } from 'UTILS/theme'
import { getDefaultOptions } from 'UTILS/options'
// import ThemeProvider from 'COMPONENTS/expand/ThemeProvider'

const AppContainer = styled.div`
  width: ${props => props.theme.grid.width * 3 + 8}px;
  background: ${props => props.theme.palette.background.default};
  color: ${props => props.theme.palette.text.primary};
  padding: 4px;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
`

interface SwProps {
  options?: SwPropsConfigOptions
}

const App: React.FC<SwProps> = props => {
  const { options } = props
  const [theme, setTheme] = useState(getTheme(getDefaultOptions(options)))

  return (
    <ThemeProvider theme={theme}>
      <AppContainer className="sw-container">
        <GlobalStyle />
        <UiManager setTheme={setTheme} options={options} />
      </AppContainer>
    </ThemeProvider>
  )
}

export default App
