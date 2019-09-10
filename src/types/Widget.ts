import { ChartUIType } from './Chart'
import { CarouselUI } from './Carousel'

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
    suffix: string
    text: string
  }[]
}

export interface MainUiLayout {
  alarms: {
    title: string
    type: string
    level: string
    description: string
    pubDate: string
    levelCode: string
    typeCode: string
  }[]
  code: string
  location: string
  uggestion: string
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

export interface BaseUiLayoutOption {
  UIType: string
  data: BaseUiLayout[] | MainUiLayout[] | ChartUIType | CarouselUI
  size: [number, number]
}

export type SwLayoutOption = BaseUiLayoutOption

export type SwLayoutOptions = SwLayoutOption[]
