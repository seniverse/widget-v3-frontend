import React, { useContext, useState } from 'react'
import { BaseUiLayoutOption } from 'TYPES/Widget'
import { ChartUIType, Content } from 'TYPES/Chart'
import TileContainer from 'COMPONENTS/base/TileContainer'
import { gridHeight, gridWidth } from 'UTILS/theme'
import styled, { ThemeContext, createGlobalStyle } from 'styled-components'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/custom'
import 'echarts/lib/component/tooltip'

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`

const ChartTooltipStyle = createGlobalStyle`
  .sw-ui-chart-tooltip {
    background: ${props => (props.theme as any).palette.chart.background};
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4px;
    border-radius: 4px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.38);

    .tooltip-chart-content {
      display: flex;
      align-items: center;
      padding: 2px;

      .tooltip-chart-text {
        font-size: 12px;
        display: inline-block;
        margin-left: 6px;
        color: ${props => (props.theme as any).palette.chart.color};
      }

      .tooltip-chart-icon {
        width: 1rem;
        height: 1rem;
      }
    }
  }
`

interface ChartUiProps {
  options: BaseUiLayoutOption
}

const ChartUI: React.FC<ChartUiProps> = props => {
  const { options } = props
  const { data, size } = options
  const [column, row] = size
  const themeContext = useContext(ThemeContext)
  const theme = themeContext.palette.icon || 'white'
  const devicePixelRatio = window.devicePixelRatio || 1
  const [tipContent, setTipContent] = useState<null | Content[][][]>(null)

  const getTooltipContent = (item: Content[][]) => {
    let domStr = `<div class="sw-ui-chart-tooltip">`
    item.map(tips => {
      let tipStr = `<div class="tooltip-chart-content">`
      tips.map(tip => {
        const { text, type } = tip
        if (type === 'text') {
          tipStr += `<span
              class="tooltip-chart-text"
            >
              ${text}
            </span>`
        } else if (type === 'icon') {
          tipStr += `<img
              class="tooltip-chart-icon"
              src="/assets/img/${theme}/${24 * devicePixelRatio}/${text}.svg"
            />`
        } else {
          tipStr += ''
        }
      })
      tipStr += `</div>`
      domStr += tipStr
    })
    return (domStr += `</div>`)
  }

  const baseChartOpts = {
    grid: {
      top: 25,
      left: 16,
      right: 16,
      bottom: 25
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
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
      backgroundColor: 'rgba(0,0,0,0)',
      padding: 0,
      axisPointer: {
        lineStyle: {
          type: 'dashed'
        }
      },
      formatter: function(params: any) {
        const { dataIndex } = params[0]
        if (!tipContent) return ''
        return getTooltipContent(tipContent[dataIndex])
      }
    },
    series: null
  }

  const baseSeriesOpt = {
    data: null,
    type: 'line',
    smooth: true,
    showSymbol: 'true',
    itemStyle: null,
    lineStyle: null,
    areaStyle: null,
    zlevel: 0,
    label: {
      show: true,
      position: 'top'
    }
  }

  const getOptions = (row: number) => {
    const xAxisData = []
    const contentArray = []
    const series = []
    for (const index in (data as ChartUIType)[0].yAxis) {
      const seriesData = []
      const type = (data as ChartUIType)[0].yAxis[index].type
      for (const item of data as ChartUIType) {
        const { content, yAxis, xAxis } = item
        if (Number(index) === 0) {
          xAxisData.push(xAxis)
          contentArray.push(content)
        }
        seriesData.push(yAxis[index].data)
      }
      switch (type) {
        case 'line':
          series.push(getLineSeries(index, seriesData))
          break
        case 'icon':
          series.push(getIconSeries(row, seriesData))
          break
        case 'text':
          series.push(getTextSeries(row, seriesData))
          break
        default:
          break
      }
    }
    if (!tipContent) setTipContent(contentArray)
    return Object.assign(
      {},
      baseChartOpts,
      { xAxis: { ...baseChartOpts.xAxis, data: xAxisData } },
      { series }
    )
  }

  const getLineSeries = (index: string, seriesData: any[]) => {
    const styleColor = `rgba(${themeContext.palette.chart.line[
      index
    ].toString()},0.6)`
    const style = { color: styleColor }
    const areaStyle = {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: styleColor
        },
        {
          offset: 1,
          color: `rgba(${themeContext.palette.chart.line[index].toString()},0)`
        }
      ])
    }
    return Object.assign(
      {},
      baseSeriesOpt,
      { data: seriesData },
      {
        itemStyle: style,
        lineStyle: style,
        areaStyle
      }
    )
  }

  const getIconSeries = (row: number, seriesData: string[]) => {
    const customData = seriesData.map((item, index) => {
      if (index > 0 && seriesData[index] === seriesData[index - 1]) {
        return [index, 0, '']
      }
      return [index, 0, item]
    })
    const iconSize = 23
    return {
      type: 'custom',
      renderItem: function(_: any, api: any) {
        const point = api.coord([api.value(0), 0])
        return {
          type: 'image',
          style: {
            image: `/assets/img/${theme}/${24 * devicePixelRatio}/${api.value(
              2
            )}.svg`,
            x: -iconSize / 2,
            y: -iconSize / 2,
            width: iconSize,
            height: iconSize
          },
          position: [point[0], gridHeight() * row - gridHeight() / 2]
        }
      },
      zlevel: 2,
      data: customData
    }
  }

  const getTextSeries = (row: number, seriesData: string[]) => {
    const customData = seriesData.map((item, index) => {
      if (index > 0 && seriesData[index] === seriesData[index - 1]) {
        return [index, 0, '']
      }
      return [index, 0, item]
    })
    return {
      type: 'custom',
      renderItem: function(_: any, api: any) {
        const point = api.coord([api.value(0), 0])
        return {
          type: 'text',
          style: {
            text: api.value(2),
            textFont: api.font({ fontSize: 10 }),
            textAlign: 'center',
            textVerticalAlign: 'bottom'
          },
          position: [point[0], gridHeight() * row - gridHeight() / 2]
        }
      },
      zlevel: 1,
      data: customData
    }
  }

  if (!data) return null
  const width = data.length * (data as ChartUIType)[0].xAxis.length * 8
  const chartWidth = Math.max(width, gridWidth() * column)
  return (
    <TileContainer className="sw-ui-chart" column={column} row={row}>
      <ChartContainer>
        <ReactEchartsCore
          echarts={echarts}
          style={{ height: '100%', width: chartWidth + 'px' }}
          option={getOptions(row)}
          notMerge={true}
          lazyUpdate={true}
        />
      </ChartContainer>
      <ChartTooltipStyle />
    </TileContainer>
  )
}

export default ChartUI