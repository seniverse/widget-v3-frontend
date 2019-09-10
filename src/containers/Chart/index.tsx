import React from 'react'
import { BaseUiLayoutOption } from 'TYPES/Widget'
import { ChartUIType } from 'TYPES/Chart'
import TileContainer from 'COMPONENTS/base/TileContainer'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

interface ChartUiProps {
  options: BaseUiLayoutOption
}

const ChartUI: React.FC<ChartUiProps> = props => {
  const { options } = props
  const { data, size } = options
  const [column, row] = size
  // const [tipContent, setTipContent] = useState<any>(null)

  const baseChartOpts = {
    grid: {
      top: 20,
      left: '5%',
      right: '5%',
      bottom: 30
    },
    xAxis: {
      type: 'category',
      data: null,
      boundaryGap: false,
      axisTick: {
        show: false
      }
    },
    yAxis: {
      show: false,
      type: 'value'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: null
  }

  const baseSeriesOpt = {
    data: null,
    type: 'line',
    smooth: true,
    itemStyle: null,
    lineStyle: null
  }

  const baseLineColor = ['#4A90E2', '#ff0000']

  const getOptions = () => {
    const xAxisData = []
    const contentArray = []
    const series = []
    for (const index in (data as ChartUIType)[0].yAxis) {
      const seriesData = []
      for (const item of data as ChartUIType) {
        const { content, yAxis, xAxis } = item
        if (Number(index) === 0) {
          xAxisData.push(xAxis)
          contentArray.push(content)
        }
        seriesData.push(yAxis[index])
      }
      const style = { color: baseLineColor[index] }
      series.push(
        Object.assign(
          {},
          baseSeriesOpt,
          { data: seriesData },
          { itemStyle: style, lineStype: style }
        )
      )
    }
    // setTipContent(contentArray)
    return Object.assign(
      {},
      baseChartOpts,
      { xAxis: { ...baseChartOpts.xAxis, data: xAxisData } },
      { series }
    )
  }

  return (
    <TileContainer className="sw-ui-chart" column={column} row={row}>
      <ReactEchartsCore
        echarts={echarts}
        style={{ height: '100%', width: 'auto' }}
        option={getOptions()}
        notMerge={true}
        lazyUpdate={true}
      />
    </TileContainer>
  )
}

export default ChartUI
