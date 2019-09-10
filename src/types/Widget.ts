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

export interface BaseUiLayoutOption {
  UIType: string
  data: BaseUiLayout[] | ChartUIType | CarouselUI
  size: [number, number]
}

export type SwLayoutOption = BaseUiLayoutOption

export type SwLayoutOptions = SwLayoutOption[]
