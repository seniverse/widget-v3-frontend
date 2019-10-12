import React from 'react'
import styled from 'styled-components'
import UiManager from 'CONTAINERS/UiManager'
import AppContainer from './AppContainer'
import { BarProps } from 'TYPES/Bar'

const Background = styled.div`
  background: ${props => props.theme.palette.background.default};
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
`

const StyledAppContainer = styled(AppContainer)`
  background: ${props => props.theme.palette.background.default};
  display: flex;
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  max-width: 600px;
  flex-wrap: wrap;
  overflow-x: hidden;
  overflow-y: auto;
`

const PerformanceBar: React.FC<BarProps> = props => {
  const { config } = props
  return (
    <Background>
      <StyledAppContainer>
        <UiManager config={config} />
      </StyledAppContainer>
    </Background>
  )
}

export default PerformanceBar
