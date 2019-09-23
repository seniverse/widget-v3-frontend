import styled from 'styled-components'

const CloseButton = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  cursor: pointer;
  display: none;

  @media screen and (max-width: 600px) {
    display: block;
  }
`

export default CloseButton
