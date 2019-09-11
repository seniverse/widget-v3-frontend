export type ChartUIType = Datum[]

interface Datum {
  content: Content[][]
  yAxis: string[]
  xAxis: string
}

export interface Content {
  type: string
  text: string
}
