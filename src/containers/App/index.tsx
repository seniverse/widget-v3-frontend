import React from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'
import GlobalStyle from 'COMPONENTS/expand/GlobalStyle'
import { SwConfigOptions } from 'TYPES/Widget'
import UiManager from 'CONTAINERS/UiManager'

const AppContainer = styled.div`
  width: 296px;
  background: #fff;
  padding: 4px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
`

interface SwProps {
  options?: SwConfigOptions
}

const App: React.FC<SwProps> = () => {
  return (
    <AppContainer className="sw-container">
      <GlobalStyle />
      <UiManager />
    </AppContainer>
  )
}

export default hot(module)(App)