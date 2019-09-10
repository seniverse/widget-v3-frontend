import { ChartUIType } from './Chart'
import { CarouselUI } from './Carousel'

export type SwType = 'bubble' | 'slim'
export type SwTheme = 'dark' | 'light' | 'auto'
export type SwLanguage = 'auto' | 'zh-Hans' | 'zh-Hant' | 'en'
export type SwGeolocation = 'enabled' | 'disabled'
export type SwUnit = 'c' | 'f'
export type SwHover = 'enabled' | 'disabled'

export interface SwConfigOptions {
  flavor: SwType
  location: string
  geolocation: SwGeolocation
  language: SwLanguage
  unit: SwUnit
  theme: SwTheme
  container: string
  token: string
  hover: SwHover
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
