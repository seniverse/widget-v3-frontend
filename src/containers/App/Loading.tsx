import React from 'react'
import styled, { keyframes } from 'styled-components'

const keyframe0 = keyframes`
  25% {
    transform: translateX(-5px) scale(0.75);
  }

  50% {
    transform: translateX(-15px) scale(0.6);
  }

  75% {
    transform: translateX(-25px) scale(0.5);
  }

  95% {
    transform: translateX(0) scale(1);
  }
`

const keyframe1 = keyframes`
  25% {
    transform: translateX(-5px) scale(0.75);
  }

  50%,
  75% {
    transform: translateX(-15px) scale(0.6);
  }

  95% {
    transform: translateX(0) scale(1);
  }
`

const keyframe2 = keyframes`
  25%,
  75% {
    transform: translateX(-5px) scale(0.75);
  }

  95% {
    transform: translateX(0) scale(1);
  }
`

const keyframe3 = keyframes`
  25%,
  75% {
    transform: translateX(5px) scale(0.75);
  }

  95% {
    transform: translateX(0) scale(1);
  }
`

const keyframe4 = keyframes`
  25% {
    transform: translateX(5px) scale(0.75);
  }

  50%,
  75% {
    transform: translateX(15px) scale(0.6);
  }

  95% {
    transform: translateX(0) scale(1);
  }
`

const keyframe5 = keyframes`
  25% {
    transform: translateX(5px) scale(0.75);
  }

  50% {
    transform: translateX(15px) scale(0.6);
  }

  75% {
    transform: translateX(25px) scale(0.5);
  }

  95% {
    transform: translateX(0) scale(1);
  }
`

const Point = styled.div`
  width: 10px;
  height: 10px;
  background: #e5e5e5;
  border-radius: 50%;
  position: absolute;
  left: calc(50% - 5px);
  top: calc(50% - 5px);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.15);
`

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  min-width: 80px;
  position: relative;
`

const Point0 = styled(Point)`
  animation: ${keyframe0} 1.5s infinite;
`

const Point1 = styled(Point)`
  animation: ${keyframe1} 1.5s infinite;
`

const Point2 = styled(Point)`
  animation: ${keyframe2} 1.5s infinite;
`

const Point3 = styled(Point)`
  animation: ${keyframe3} 1.5s infinite;
`

const Point4 = styled(Point)`
  animation: ${keyframe4} 1.5s infinite;
`

const Point5 = styled(Point)`
  animation: ${keyframe5} 1.5s infinite;
`

const Loading = () => (
  <LoadingContainer>
    <Point0 />
    <Point1 />
    <Point2 />
    <Point3 />
    <Point4 />
    <Point5 />
  </LoadingContainer>
)

export default Loading
