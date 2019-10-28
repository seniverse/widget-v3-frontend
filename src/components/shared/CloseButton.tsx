import React from 'react'
import styled from 'styled-components'

const AbsoluteButton = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
  display: none;
  font-size: 1.6rem;
  width: 1.6rem;
  height: 1.6rem;
  line-height: 1;
  align-items: center;
  justify-content: center;
  z-index: 3001;

  @media screen and (max-width: 600px) {
    display: flex;
  }
`

const CloseButton: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  return <AbsoluteButton {...props}>×</AbsoluteButton>
}

export default CloseButton
