import React from 'react'
import styled from 'styled-components'
import App from 'CONTAINERS/App'
import { hot } from 'react-hot-loader'
import { getDefaultOptions } from 'UTILS/options'

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
      options={getDefaultOptions({
        flavor: 'bubble' as 'bubble',
        location: 'beijing',
        geolocation: true as boolean,
        language: 'zh-Hant' as 'zh-Hant',
        unit: 'c' as 'c',
        theme: 'auto' as 'auto',
        token: 'e8a89e2f-31a1-4771-8739-edcc017c6c02',
        hover: 'always' as 'always'
      })}
    />
  </PlaygroundContainer>
)

export default hot(module)(Playground)
