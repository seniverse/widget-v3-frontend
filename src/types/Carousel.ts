export interface CarouselUILayout {
  header: string
  content: Content[]
}

export interface Content {
  type: string
  text: string
  suffix: string
}
