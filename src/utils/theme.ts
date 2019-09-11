import _ from 'lodash'
import { SwConfigOptions, SwTheme, SwLayoutOptions } from 'TYPES/Widget'

const createTheme: () => SwTheme = () => {
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
      divider: 'rgba(0, 0, 0, 0.12)',
      icon: 'white',
      chart: {
        line: ['#4A90E2', '#ff0000'],
        background: '#fff',
        color: '#000'
      }
    },
    grid: {
      width: 108,
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
        fontSize: '1.65rem', // 30px
        fontWeight: 500,
        lineHeight: 1.4 // 42px
      },
      h2: {
        fontSize: '2.5rem', // 30px
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
    divider: 'rgba(255, 255, 255, 0.12)',
    icon: 'black',
    chart: {
      line: ['#4A90E2', '#ff0000']
    }
  }
}

const getAutoBackground = (code: number) => {
  switch (code) {
    case 0:
      return 'linear-gradient(#2869E9,#79BFFF)'
    case 1:
      return 'linear-gradient(#1B1D5C,#5D428E)'
    case 2:
      return 'linear-gradient(#2869E9,#79BFFF)'
    case 3:
      return 'linear-gradient(#1B1D5C,#5D428E)'
    case 4:
      return 'linear-gradient(#6F7C85,#919B9F)'
    case 5:
      return 'linear-gradient(#2869E9,#79BFFF)'
    case 6:
      return 'linear-gradient(#1B1D5C,#5D428E)'
    case 7:
      return 'linear-gradient(#6F7C85,#919B9F)'
    case 8:
      return 'linear-gradient(#2B2C2D,#6E747B)'
    case 9:
      return 'linear-gradient(#6F7C85,#919B9F)'

    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 19:
    case 20:
      return 'linear-gradient(#566B6E,#7D939B)'

    case 16:
    case 17:
    case 18:
      return 'linear-gradient(#2F4146,#617279)'

    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
      return 'linear-gradient(#6F7C85,#919B9F)'

    case 26:
    case 27:
    case 28:
    case 29:
      return 'linear-gradient(#9E8A47,#CCB166)'

    case 30:
      return 'linear-gradient(#6F7C85,#919B9F)'
    case 31:
      return 'linear-gradient(#6C6C6C,#959595)'

    case 32:
    case 33:
      return 'linear-gradient(#2869E9,#79BFFF)'

    case 34:
    case 35:
    case 36:
      return 'linear-gradient(#2F4146,#617279)'

    case 37:
      return 'linear-gradient(#69A9E8,#B5DAFB)'
    case 38:
      return 'linear-gradient(#E7592B,#FBA42F)'
    case 99:
      return 'linear-gradient(#6F7C85,#919B9F)'
    default:
      return 'linear-gradient(#6F7C85,#919B9F)'
  }
}

const getAutoTheme = (weather: SwLayoutOptions) => {
  const getWeatherCode = (weather: SwLayoutOptions) => {
    const main = weather.find(item => item.UIType === 'main')
    return _.get(main, 'data[0].code', 99)
  }
  const code = getWeatherCode(weather)

  return {
    palette: {
      background: {
        default: getAutoBackground(code)
      },
      text: {
        disabled: 'rgba(255, 255, 255, 0.38)',
        hint: 'rgba(255, 255, 255, 0.38)',
        primary: 'rgba(255, 255, 255, 1)',
        secondary: 'rgba(255, 255, 255, 0.54)'
      },
      divider: 'rgba(255, 255, 255, 0.3)'
    }
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
  } else if (options.theme === 'auto' && weather) {
    _.merge(baseTheme, getAutoTheme(weather))
    console.log(weather)
  }

  return baseTheme
}

export const gridWidth = () => theme.grid.width
export const gridHeight = () => theme.grid.height

// export const not = (...keys: string[]) => (value: string) => (props: any) => {
//   for (const key of keys) {
//     if (props[key]) {
//       return ''
//     }
//   }
//   return value
// }

export const check = (...keys: string[]) => (value: string | Function) => (
  props: any
) => {
  for (const key of keys) {
    if (props[key]) {
      return typeof value === 'function' ? value(props) : value
    }
  }
  return ''
}

export const checkBy = (property: string, mapping: any) => (props: any) =>
  mapping[props[property]]

export default theme
