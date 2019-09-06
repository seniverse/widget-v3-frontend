export type SwType = 'float' | 'fixed'

export type SwLanguage = 'auto' | 'zh-cn' | 'zh-tw' | 'en'

export interface SwConfigOptions {
  type: SwType
  token: string
  language: SwLanguage
}

export interface BaseUiLayoutOption {
  UIType: string
  data: any[]
  size: [number, number]
}

export interface UiMainLayoutOption extends BaseUiLayoutOption {
  data: any[]
}

export interface UiCarouselLayoutOption extends BaseUiLayoutOption {
  data: any[]
}

export type SwLayoutOption = UiMainLayoutOption | UiCarouselLayoutOption

export type SwLayoutOptions = SwLayoutOption[]
