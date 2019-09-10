import React from 'react'
import styled from 'styled-components'
import App from 'CONTAINERS/App'
import { hot } from 'react-hot-loader'

const PlaygroundContainer = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Playground: React.FC = () => (
  <PlaygroundContainer>
    <App
      options={{
        flavor: 'slim' as 'slim',
        location: 'beijing',
        geolocation: 'enabled' as 'enabled',
        language: 'zh-Hant' as 'zh-Hant',
        unit: 'c' as 'c',
        theme: 'light' as 'dark',
        token: 'XXX',
        hover: 'enabled' as 'enabled'
      }}
    />
  </PlaygroundContainer>
)

export default hot(module)(Playground)
