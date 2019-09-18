export type ChartUIType = Datum[]

interface Datum {
  content: Content[][]
  yAxis: YaxisType[]
  xAxis: string
}

interface YaxisType {
  data: string
  type: string
  inverse?: boolean
  combine?: boolean
}

export interface Content {
  type: string
  text: string
}
