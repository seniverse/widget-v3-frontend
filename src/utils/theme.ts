import { css } from 'styled-components'
import get from 'lodash/get'
import merge from 'lodash/merge'
import { SwConfigOptions, SwTheme, SwLayoutOptions } from 'TYPES/Widget'
import { getCodeByTime } from 'UTILS/helper'

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
        default: '#fff',
        line: [[189, 229, 246], [189, 229, 246]],
        background: '#fff',
        color: 'rgba(24, 24, 24)',
        label: 'rgba(24, 24, 24, 0.6)'
      }
    },
    grid: {
      width: 110.6,
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
      default: '#343434',
      line: [[207, 107, 97], [234, 174, 78]],
      background: '#000',
      color: 'rgba(255, 255, 255)',
      label: 'rgba(255, 255, 255, 0.6)'
    }
  }
}

const autoTheme = merge({}, darkTheme, {
  palette: {
    chart: {
      default: '#343434',
      line: [[245, 209, 47], [243, 63, 32]],
      background: '#000',
      color: 'rgba(255, 255, 255)',
      label: 'rgba(255, 255, 255, 0.6)'
    },
    icon: 'chameleon'
  }
})

const hexToRgb = (hex: string): number[] => {
  let c: any = hex.substring(1).split('')
  if (c.length === 3) {
    c = [c[0], c[0], c[1], c[1], c[2], c[2]]
  }
  c = '0x' + c.join('')
  return [(c >> 16) & 255, (c >> 8) & 255, c & 255]
}

const getAutoColor = (
  code: number
): {
  background: string
  main: {
    hex: string
    rgb: number[]
  }
  sub: {
    hex: string
    rgb: number[]
  }
} => {
  let hexs = []

  switch (code) {
    case 0:
      hexs = ['#2869E9', '#79BFFF']
      break
    case 1:
      hexs = ['#1B1D5C', '#5D428E']
      break
    case 2:
      hexs = ['#2869E9', '#79BFFF']
      break
    case 3:
      hexs = ['#1B1D5C', '#5D428E']
      break
    case 4:
      hexs = ['#6F7C85', '#919B9F']
      break
    case 5:
      hexs = ['#2869E9', '#79BFFF']
      break
    case 6:
      hexs = ['#1B1D5C', '#5D428E']
      break
    case 7:
      hexs = ['#6F7C85', '#919B9F']
      break
    case 8:
      hexs = ['#2B2C2D', '#6E747B']
      break
    case 9:
      hexs = ['#6F7C85', '#919B9F']
      break

    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 19:
    case 20:
      hexs = ['#566B6E', '#7D939B']
      break

    case 16:
    case 17:
    case 18:
      hexs = ['#2F4146', '#617279']
      break

    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
      hexs = ['#6F7C85', '#919B9F']
      break

    case 26:
    case 27:
    case 28:
    case 29:
      hexs = ['#9E8A47', '#CCB166']
      break

    case 30:
      hexs = ['#6F7C85', '#919B9F']
      break
    case 31:
      hexs = ['#6C6C6C', '#959595']
      break

    case 32:
    case 33:
      hexs = ['#2869E9', '#79BFFF']
      break

    case 34:
    case 35:
    case 36:
      hexs = ['#2F4146', '#617279']
      break

    case 37:
      hexs = ['#69A9E8', '#B5DAFB']
      break
    case 38:
      hexs = ['#E7592B', '#FBA42F']
      break
    case 99:
      hexs = ['#6F7C85', '#919B9F']
      break
    default:
      hexs = ['#6F7C85', '#919B9F']
      break
  }

  return {
    background: `linear-gradient(${hexs[0]}, ${hexs[1]})`,
    main: {
      hex: hexs[0],
      rgb: hexToRgb(hexs[0])
    },
    sub: {
      hex: hexs[1],
      rgb: hexToRgb(hexs[1])
    }
  }
}

export const scrollbar = css`
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }

  ::-webkit-scrollbar-track {
    border-radius: 2px;
    transition: all 0.3s;
    background: rgba(0, 0, 0, 0);
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    transition: all 0.3s;
    background: rgba(0, 0, 0, 0);
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0);
  }

  &:hover {
    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.12);
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.12);
    }
  }
`

const getAutoTheme = (weather: SwLayoutOptions) => {
  const getWeatherCode = (weather: SwLayoutOptions) => {
    const main = weather.find(item => item.UIType === 'main')
    const code = get(main, 'data[0].code', { now: 99, night: 99, day: 99 })
    const sun = get(main, 'data[0].sun', {})
    return getCodeByTime(code, sun)
  }

  const code = getWeatherCode(weather)
  const autoColor = getAutoColor(parseInt(code, 10))

  return {
    palette: {
      chart: {
        line: [autoColor.main.rgb, autoColor.sub.rgb]
      },
      background: {
        default: autoColor.background
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
  weather: SwLayoutOptions
) => {
  const baseTheme = createTheme()

  if (options.theme === 'dark') {
    merge(baseTheme, darkTheme)
  } else if (options.theme === 'auto' && weather.length > 0) {
    merge(baseTheme, autoTheme, getAutoTheme(weather))
  }

  return merge(baseTheme, options.themeOption)
}

export const gridWidth = () => theme.grid.width
export const gridHeight = () => theme.grid.height
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
