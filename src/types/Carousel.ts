export type CarouselUI = Datum[]

interface Datum {
  header: string
  content: Content[]
}

interface Content {
  type: string
  text: string
  suffix: string
}
