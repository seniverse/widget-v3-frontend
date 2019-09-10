import React, { ElementType } from 'react'
import styled from 'styled-components'

interface BaseTypographyProps {
  className?: string
  noWrap?: boolean
  variant?: 'caption' | 'body2' | 'h3'
  color?: 'textPrimary' | 'textSecondary'
}

interface TypographyProps extends BaseTypographyProps {
  component?: ElementType
}

// prettier-ignore
const BaseTypography = styled.p<BaseTypographyProps>`
  font-family: 'PingFangSC', 'Helvetica Neue', Helvetica, Arial, 'Hiragino Sans GB', 'Heiti SC', 'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif;
  font-size: ${props => props.theme.typography[props.variant || 'body2'].fontSize};
  line-height: ${props => props.theme.typography[props.variant || 'body2'].lineHeight};
  font-weight: ${props => props.theme.typography[props.variant || 'body2'].fontWeight};
  margin: 0;
`

const Typography: React.FC<TypographyProps> = props => {
  const { component, ...otherProps } = props

  return <BaseTypography as={component} {...otherProps} />
}

export default Typography
