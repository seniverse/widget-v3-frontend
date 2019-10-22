import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { getIconUrl } from 'UTILS/theme'
import OptionProvider from 'COMPONENTS/expand/OptionProvider'

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

const Icon: React.FC<PropsType> = props => {
  const themeContext = useContext(ThemeContext)
  const optionContext = useContext(OptionProvider)
  const { assetsPath } = optionContext

  const theme = themeContext.palette.icon || 'white'
  const { name, ...otherProps } = props
  return (
    <Img
      {...otherProps}
      src={getIconUrl(assetsPath, `${name}.svg`, theme)}
    ></Img>
  )
}

export default Icon
