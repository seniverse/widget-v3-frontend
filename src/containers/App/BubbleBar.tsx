import React from 'react'
import styled from 'styled-components'
import { SwLayoutOptions, MainUiLayout } from 'TYPES/Widget'
import Loading from './Loading'
import Typography from 'COMPONENTS/base/Typography'

interface BubbleBarProps {
  config: SwLayoutOptions
}

const Container = styled.div`
  padding: 8px;
  display: flex;
`

const WeatherIcon = styled.img`
  width: 32px;
  height: 32px;
  display: block;
`

const BubbleBar: React.FC<BubbleBarProps> = props => {
  const { config } = props

  const main = config.find(item => item.UIType === 'main')

  if (main) {
    const data = main.data as MainUiLayout[]
    const { location, temperature, code } = data[0]
    return (
      <Container>
        <WeatherIcon src={`/assets/img/chameleon/56/${code}.svg`} />
        <div>
          <Typography>{location}</Typography>
          <Typography>{temperature}</Typography>
        </div>
      </Container>
    )
  } else {
    return (
      <div>
        <Loading />
      </div>
    )
  }
}

export default BubbleBar
