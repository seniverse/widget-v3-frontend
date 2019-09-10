export type CarouselUI = Datum[]

interface Datum {
  header: string
  content: Content[]
}

export interface Content {
  type: string
  text: string
  suffix: string
}
