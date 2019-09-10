// import { useContext } from 'react'
import _ from 'lodash'
// import ThemeContext from 'COMPONENTS/expand/ThemeContext'
import { SwConfigOptions, SwTheme, SwLayoutOptions } from 'TYPES/Widget'

const createTheme: () => SwTheme = () => {
  // console.log(useContext(ThemeContext))
  return {
    palette: {
      background: {
        default: '#fff'
      },
      text: {
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)',
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)'
      },
      divider: 'rgba(0, 0, 0, 0.12)'
    },
    grid: {
      width: 96,
      height: 80
    },
    typography: {
      caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: 4 / 3
      },
      body2: {
        fontSize: '0.875rem', // 14px
        fontWeight: 400,
        lineHeight: 12 / 7 // 24px
      },
      h3: {
        fontSize: '1.875rem', // 30px
        fontWeight: 500,
        lineHeight: 1.4 // 42px
      }
    }
  }
}

const darkTheme = {
  palette: {
    background: {
      default: 'linear-gradient(to bottom, #343434, #4A4A4A)'
    },
    text: {
      disabled: 'rgba(255, 255, 255, 0.38)',
      hint: 'rgba(255, 255, 255, 0.38)',
      primary: 'rgba(255, 255, 255, 1)',
      secondary: 'rgba(255, 255, 255, 0.54)'
    },
    divider: 'rgba(255, 255, 255, 0.12)'
  }
}

const theme = createTheme()

export const getTheme = (
  options: SwConfigOptions,
  weather?: SwLayoutOptions
) => {
  const baseTheme = createTheme()

  if (options.theme === 'dark') {
    _.merge(baseTheme, darkTheme)
  } else if (options.theme === 'auto') {
    console.log(weather)
  }

  console.log(baseTheme)

  return baseTheme
}

export const gridWidth = () => theme.grid.width
export const gridHeight = () => theme.grid.height

export default theme
