import React, { ElementType } from 'react'
import styled from 'styled-components'
import { check, checkBy } from 'UTILS/theme'

interface BaseTypographyProps {
  className?: string
  noWrap?: boolean
  variant?: 'caption' | 'body2' | 'h3' | 'h2'
  color?: 'textPrimary' | 'textSecondary' | 'inherit'
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  lineHeight?: string
}

interface TypographyProps extends BaseTypographyProps {
  component?: ElementType
}

// prettier-ignore
const BaseTypography = styled.p<BaseTypographyProps>`
  font-family: 'PingFangSC', 'Helvetica Neue', Helvetica, Arial, 'Hiragino Sans GB', 'Heiti SC', 'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif;
  font-size: ${props => props.theme.typography[props.variant || 'body2'].fontSize};
  line-height: ${props => props.lineHeight || props.theme.typography[props.variant || 'body2'].lineHeight};
  font-weight: ${props => props.theme.typography[props.variant || 'body2'].fontWeight};
  margin: 0;
  ${check('noWrap')(`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `)}
  text-align: ${props => props.align};
  white-space: pre;
  /* stylelint-disable */
  color: ${checkBy('color', {
    textPrimary: (props: any) =>  props.theme.palette.text.primary,
    textSecondary: (props: any) =>  props.theme.palette.text.secondary,
    inherit: 'inherit'
  })};
`

const Typography: React.FC<TypographyProps> = props => {
  const {
    component,
    className = '',
    noWrap,
    variant = 'body2',
    color = 'inherit',
    align = 'inherit',
    lineHeight,
    ...others
  } = props

  return (
    <BaseTypography
      as={component}
      className={className}
      noWrap={noWrap}
      variant={variant}
      lineHeight={lineHeight}
      color={color}
      align={align}
      {...others}
    />
  )
}

export default Typography
