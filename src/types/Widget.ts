import { ChartUiLayout } from './Chart'
import { CarouselUILayout } from './Carousel'

export type SwType = 'bubble' | 'slim'
export type SwLanguage = 'auto' | 'zh-Hans' | 'zh-Hant' | 'en'
export type SwGeolocation = 'enabled' | 'disabled'
export type SwUnit = 'c' | 'f'
export type SwHover = 'enabled' | 'disabled'
export type SwOptionFlavor = 'bubble' | 'slim'
export type SwOptionTheme = 'dark' | 'light' | 'auto'
export type SwOptionLanguage = 'auto' | 'zh-Hans' | 'zh-Hant' | 'en'
export type SwOptionGeolocation = 'enabled' | 'disabled'
export type SwOptionUnit = 'c' | 'f'
export type SwOptionHover = 'enabled' | 'disabled'

export interface SwPropsConfigOptions {
  flavor?: SwOptionFlavor
  location?: string
  geolocation?: SwOptionGeolocation
  language?: SwOptionLanguage
  unit?: SwOptionUnit
  theme?: SwOptionTheme
  container?: string
  token: string
  hover?: SwOptionHover
}
export interface SwConfigOptions {
  flavor: SwOptionFlavor
  location: string
  geolocation: SwOptionGeolocation
  language: SwOptionLanguage
  unit: SwOptionUnit
  theme: SwOptionTheme
  container: string
  token: string
  hover: SwOptionHover
}

export interface SwTheme {
  palette: {
    background: {
      default: string
    }
  }
  grid: {
    width: number
    height: number
  }
}

export interface BaseUiLayout {
  header: string
  content: {
    type?: string
    suffix?: string
    prefix?: string
    text: string
  }[]
}

export interface AlarmData {
  title: string
  type: string
  level: string
  description: string
  pubDate: string
  levelCode: number
  typeCode: string
}

export interface MainUiLayout {
  alarms: AlarmData[]
  code: {
    now: string
    day: string
    night: string
  }
  location: string
  suggestion: string
  sun: {
    rise: string
    set: string
  }
  temperature: string
  text: string
  today: {
    low: string
    high: string
  }
  updateAt: string
  yesterday: {
    low: string
    high: string
  }
}

type UILayout = BaseUiLayout | MainUiLayout | ChartUiLayout | CarouselUILayout

export interface BaseUiLayoutOption {
  UIType: string
  data: UILayout[]
  size: [number, number]
}

export type SwLayoutOption = BaseUiLayoutOption

export type SwLayoutOptions = SwLayoutOption[]
