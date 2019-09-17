import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { SwLayoutOptions, MainUiLayout } from 'TYPES/Widget'
import Loading from './Loading'
import Typography from 'COMPONENTS/base/Typography'
import { getCodeByTime } from 'UTILS/helper'

interface BubbleBarProps {
  config: SwLayoutOptions
}

const Container = styled.div`
  padding: 8px;
  display: flex;
  width: fit-content;
`

const WeatherIcon = styled.img`
  width: 32px;
  height: 32px;
  display: block;
  margin-right: 8px;
`

const BubbleBar: React.FC<BubbleBarProps> = (props, ref) => {
  const { config } = props

  const main = config.find(item => item.UIType === 'main')

  if (main) {
    const data = main.data as MainUiLayout[]
    const { location, temperature, code, sun } = data[0]
    return (
      <Container className="sw-bar-bubble" ref={ref}>
        <WeatherIcon
          src={`/assets/img/chameleon/56/${getCodeByTime(code, sun)}.svg`}
        />
        <div>
          <Typography
            variant="body2"
            className="sw-bar-bubble-location"
            lineHeight="1.2"
          >
            {location}
          </Typography>
          <Typography
            variant="body2"
            className="sw-bar-bubble-temperature"
            lineHeight="1.2"
          >
            {temperature}
          </Typography>
        </div>
      </Container>
    )
  } else {
    return <Loading />
  }
}

export default forwardRef(BubbleBar)
