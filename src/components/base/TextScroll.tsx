import React from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

interface TextScrollProp {
  className?: string
  text: Array<string>
  speed?: number
}

interface TextScrollState {
  duration: number
  contentWidth?: number
  containerWidth?: number
}

class Horizontal extends React.Component<TextScrollProp, TextScrollState> {
  container: any

  state = {
    duration: 5000,
    contentWidth: 500,
    containerWidth: 500
  }

  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this.container) as Element
    const parentElement = dom.parentElement
    const children = dom.children
    const containerWidth = parentElement ? parentElement.clientWidth : 500
    let contentWidth = 0
    for (let i = 0; i < children.length; i++) {
      contentWidth += children[i].scrollWidth
      contentWidth += containerWidth
    }

    contentWidth = contentWidth === 0 ? 500 : contentWidth

    const duration = ((this.props.speed || 5000) * contentWidth) / 500000
    this.setState({
      duration: duration,
      contentWidth: contentWidth,
      containerWidth: containerWidth
    })
  }

  render() {
    const Container = styled.div`
      position: relative;
      height: 30px;
      left: ${this.state.containerWidth}px;
      animation: changebox ${this.state.duration}s linear infinite;
      animation-play-state: running;
      animation-fill-mode: forwards;

      &:hover {
        animation-play-state: paused;
        cursor: default;
      }

      @keyframes changebox {
        0% {
          transform: translateX(0);
        }

        100% {
          transform: translateX(-${this.state.contentWidth}px);
        }
      }
    `

    const Item = styled.span`
      display: inline-block;
      line-height: 30px;
      margin-right: ${this.state.containerWidth}px;
    `

    return (
      <div className={this.props.className}>
        <Container ref={(div: any) => (this.container = div)}>
          {this.props.text.map((e: any, i: number) => (
            <Item key={i} title={e}>
              {e}
            </Item>
          ))}
        </Container>
      </div>
    )
  }
}

const StyledHorizontal = styled(Horizontal)`
  overflow: hidden;
  width: 100%;
  border-bottom: 1px solid #eee;
  word-break: keep-all;
  white-space: nowrap;
  display: flex;
  align-items: center;
`
export default StyledHorizontal
