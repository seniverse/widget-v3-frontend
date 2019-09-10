export type ChartUIType = Datum[]

interface Datum {
  content: Content[][]
  yAxis: string[]
  xAxis: string
}

interface Content {
  type: string
  text: string
}
