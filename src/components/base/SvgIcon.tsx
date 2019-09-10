import React from 'react'
import styled from 'styled-components'

const Img = styled(({ ...props }) => <img {...props} />)`
  width: ${props => props.width || '1em'};
  height: ${props => props.height || '1em'};
  margin: ${props => props.m || 0};
  color: ${props => props.color};
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  flex: 0 0 auto;
`

interface PropsType {
  name: string
  className?: string
  width?: string
  height?: string
  m?: string
  color?: string
}

function Icon(props: PropsType) {
  const { name, ...otherProps } = props
  return <Img {...otherProps} src={`/assets/img/white/24/${name}.svg`}></Img>
}

export default Icon
