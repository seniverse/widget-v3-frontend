import React, { useContext, useState } from 'react'
import styled, { ThemeContext, createGlobalStyle } from 'styled-components'

import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/custom'
import 'echarts/lib/component/tooltip'

import { BaseUiLayoutOption, SwTheme } from 'TYPES/Widget'
import { ChartUiLayout, Content } from 'TYPES/Chart'
import { gridHeight, gridWidth, getIconUrl } from 'UTILS/theme'

import TileContainer from 'COMPONENTS/base/TileContainer'
import OptionProvider from 'COMPONENTS/expand/OptionProvider'

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
    border-radius: 2px;
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
  const themeContext = useContext(ThemeContext) as SwTheme
  const optionContext = useContext(OptionProvider)
  const { assetsPath } = optionContext

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
              src="${getIconUrl(assetsPath, `weather/${text}.svg`, theme)}"
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

  const xAxisDataLength = (data as ChartUiLayout[]).length

  const baseChartOpts = {
    animation: false,
    grid: {
      top: 25,
      left: 0,
      right: 0,
      bottom: 25
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      data: null,
      boundaryGap: false,
      axisLabel: {
        align: 'left',
        interval: (index: number) => {
          if (index === 0) return true
          if (index === xAxisDataLength - 1) return false
          if (xAxisDataLength <= 7) return true
          if (xAxisDataLength <= 15) return index % 2 === 0
          return index % 3 === 0
        },
        ...themeContext.palette.chart.label
      },
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
      backgroundColor: 'rgba(0, 0, 0, 0)',
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
      },
      textStyle: {
        color: themeContext.palette.chart.label.color,
        fontFamily: themeContext.palette.chart.label.fontFamily
      }
    },
    series: null
  }

  const baseSeriesOpt = {
    data: null,
    type: 'line',
    smooth: true,
    showSymbol: true,
    itemStyle: null,
    lineStyle: null,
    areaStyle: null,
    zlevel: 0,
    label: {
      show: false,
      position: 'top'
    }
  }

  const getOptions = (row: number) => {
    const xAxisData = []
    const contentArray = []
    const series = []

    let min = Infinity
    let max = 0
    let inverse = false

    for (const index in (data as ChartUiLayout[])[0].yAxis) {
      const seriesData = []
      const type = (data as ChartUiLayout[])[0].yAxis[index].type
      for (const item of data as ChartUiLayout[]) {
        const { content, yAxis, xAxis } = item
        if (!inverse) inverse = yAxis[index].inverse || inverse
        if (Number(index) === 0) {
          xAxisData.push(xAxis)
          contentArray.push(content)
        }
        seriesData.push(yAxis[index].data)
      }

      let size: number
      switch (type) {
        case 'line':
          min = Math.min(min, ...seriesData.map(d => parseInt(d)))
          max = Math.max(max, ...seriesData.map(d => parseInt(d)))
          series.push(getLineSeries(parseInt(index, 10), seriesData, inverse))
          break
        case 'icon':
          size = 18
          series.push(
            getCombineSeries(row, seriesData, {
              itemSize: size,
              itemOptions: { type: 'image' },
              dataOptions: { zlevel: 2 },
              itemStyle: api => {
                if (!Number.isNaN(api.value(2))) {
                  return {
                    image: `${getIconUrl(
                      assetsPath,
                      `weather/${api.value(2)}.svg`,
                      theme
                    )}`,
                    x: -size / 2,
                    y: -size / 2,
                    width: size,
                    height: size
                  }
                } else {
                  return {
                    x: -size / 2,
                    y: -size / 2,
                    width: size,
                    height: size
                  }
                }
              }
            })
          )
          break
        case 'text':
          size = 12
          series.push(
            getCombineSeries(row, seriesData, {
              itemSize: size,
              itemOptions: { type: 'text' },
              dataOptions: { zlevel: 1 },
              itemStyle: api => ({
                fill: themeContext.palette.chart.label.color,
                text: api.value(2),
                textFont: api.font({
                  fontSize: size,
                  fontFamily: themeContext.palette.chart.label.fontFamily
                }),
                textAlign: 'center',
                textVerticalAlign: 'bottom'
              })
            })
          )
          break
        default:
          break
      }
    }
    if (!tipContent) setTipContent(contentArray)

    return Object.assign(
      {},
      baseChartOpts,
      {
        xAxis: {
          ...baseChartOpts.xAxis,
          data: xAxisData
        },
        yAxis: {
          ...baseChartOpts.yAxis,
          min: isNaN(min) ? 'dataMin' : min - 5,
          max: isNaN(max) ? 'dataMax' : max + 1,
          inverse
        }
      },
      { series }
    )
  }

  const getLineSeries = (
    index: number,
    seriesData: any[],
    inverse: boolean
  ) => {
    const styleColor = `rgba(${themeContext.palette.chart.line[
      index
    ].toString()}, 1)`
    const areaColors = [
      styleColor,
      `rgba(${themeContext.palette.chart.line[index].toString()}, 0)`
    ]
    const bgColor = (inverse ? areaColors.reverse() : areaColors).map(
      (color, index) => ({
        color,
        offset: index
      })
    )
    const areaStyle = {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, bgColor)
    }
    return Object.assign(
      {},
      baseSeriesOpt,
      { data: seriesData },
      {
        itemStyle: {
          color: styleColor
        },
        lineStyle: {
          color: styleColor,
          width: 1
        },
        areaStyle
      },
      {
        showSymbol: false,
        symbol: 'none',
        animation: false
      }
    )
  }

  const getCombineSeries = (
    row: number,
    seriesData: string[],
    options: {
      itemSize: number
      itemOptions: any
      dataOptions: any
      itemStyle: (api: any) => any
    }
  ) => {
    const customData = seriesData.map((item, index) => {
      if (index > 0 && seriesData[index] === seriesData[index - 1]) {
        return [index, 0, '']
      }
      return [index, 0, item]
    })

    return Object.assign({}, options.dataOptions, {
      type: 'custom',
      data: customData,
      renderItem: function(_: any, api: any) {
        const categoryIndex = api.value(0)
        const point = api.coord([api.value(0), 0])
        let left = point[0]

        if (categoryIndex === 0) {
          if (
            customData[categoryIndex + 1] &&
            !customData[categoryIndex + 1][2]
          ) {
            left += options.itemSize / 2
          }
        }
        if (categoryIndex === customData.length - 1) {
          if (
            customData[categoryIndex - 1] &&
            !customData[categoryIndex - 1][2]
          ) {
            left -= options.itemSize / 2
          }
        }

        return Object.assign({}, options.itemOptions, {
          position: [left, gridHeight() * row - gridHeight() / 2],
          style: options.itemStyle(api)
        })
      }
    })
  }

  if (!data) return null
  const width = data.length * (data as ChartUiLayout[])[0].xAxis.length * 8
  const chartWidth = Math.max(
    Math.max(width, gridWidth() * column) / 3,
    gridWidth() * column
  )

  return (
    <TileContainer className="sw-ui-chart" column={column} row={row}>
      <ChartContainer className="sw-ui-chart-container">
        <ReactEchartsCore
          echarts={echarts}
          style={{ height: '100%', minWidth: chartWidth + 'px' }}
          option={getOptions(row)}
          notMerge={true}
          opts={{
            devicePixelRatio: devicePixelRatio * 2
          }}
          lazyUpdate={true}
        />
      </ChartContainer>
      <ChartTooltipStyle />
    </TileContainer>
  )
}

export default ChartUI
