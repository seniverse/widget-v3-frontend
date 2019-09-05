import React from 'react'
import logo from './logo.svg'
import { hot } from 'react-hot-loader'
// import './App.css'
import styled, { keyframes } from 'styled-components'
import GlobalStyle from './components/expand/GlobalStyle'

const appLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const AppContainer = styled.div`
  text-align: center;
`

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const AppLogo = styled.img`
  animation: ${appLogoSpin} infinite 20s linear;
  height: 40vmin;
  pointer-events: none;
`

const App: React.FC = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <AppHeader>
        <AppLogo src={logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </AppHeader>
    </AppContainer>
  )
}

export default hot(module)(App)
