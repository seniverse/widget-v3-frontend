import React from 'react'
import styled from 'styled-components'
import App from 'CONTAINERS/App'
import { hot } from 'react-hot-loader'
import { getDefaultOptions } from 'UTILS/options'
import GlobalStyle from 'COMPONENTS/expand/GlobalStyle'

const PlaygroundContainer = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Playground: React.FC = () => (
  <PlaygroundContainer>
    <GlobalStyle />
    <App
      options={getDefaultOptions({
        flavor: 'bubble' as 'bubble',
        location: 'beijing',
        geolocation: true,
        language: 'zh-Hant',
        unit: 'c',
        theme: 'auto' as 'auto',
        token: '', // 将生成的 Token 填入此处
        hover: 'always' as 'always'
      })}
    />
  </PlaygroundContainer>
)

export default hot(module)(Playground)
