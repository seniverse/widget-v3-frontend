import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { AlarmData } from 'TYPES/Widget'

const IconFont = createGlobalStyle`
  @font-face {
    font-family: 'alarmicon';
    src: url('/assets/font/alarm-iconfont.eot');
    src:
      url('/assets/font/alarm-iconfont.eot#iefix') format('embedded-opentype'),
      url('/assets/font/alarm-iconfont.woff') format('woff'),
      url('/assets/font/alarm-iconfont.ttf') format('truetype'),
      url('/assets/font/alarm-iconfont.svg') format('svg');
  }

  .icon-background-alarmCircle {
    margin: 3px 3px;
    display: inline-flex; /* TODO */
    padding: 4px 4px;
    line-height: 14px;
    border-radius: 12px;
    background-color: rgba(0, 0, 0, 0.2);
    white-space: nowrap;
    font-family: "PingFang SC", "Microsoft YaHei UI", "STHeitiSC-Light", "Microsoft YaHei", sans-serif;
    font-size: 12px;
  }

  .icon-background-alarmGlanceCircle {
    margin: 3px 3px;
    display: inline-flex; /* TODO */
    line-height: 14px;
    border-radius: 12px;
    background-color: rgba(0, 0, 0, 0.2);
    white-space: nowrap;
    font-family: "PingFang SC", "Microsoft YaHei UI", "STHeitiSC-Light", "Microsoft YaHei", sans-serif;
    font-size: 12px;
    padding: 3px 3px 3px 3px !important;
  }

  /* 雷电预警 */
  .icon-thunder::before { content: "\\e632"; }

  /* 持续低温预警 */
  .icon-cold::before { content: "\\e62c"; }

  /* 高温预警 */
  .icon-hot::before { content: "\\e635"; }

  /* 霜冻预警 */
  .icon-frost::before { content: "\\e634"; }

  /* 电线积冰预警 */
  .icon-freeze-wire::before { content: "\\e630"; }

  /* 暴雨预警 */
  .icon-rain::before { content: "\\e62d"; }

  /* 暴雪预警 */
  .icon-snow::before { content: "\\e62e"; }

  /* 大雾预警 */
  .icon-fog::before { content: "\\e628"; }

  /* 干旱预警 */
  .icon-dry::before { content: "\\e62b"; }

  /* 寒潮预警 */
  .icon-cold-wave::before { content: "\\e62a"; }

  /* 台风预警 */
  .icon-typhoon::before { content: "\\e626"; }

  /* 冰雹预警 */
  .icon-hailstone::before { content: "\\e625"; }

  /* 雾霾预警 */
  .icon-haze::before { content: "\\e633"; }

  /* 道路结冰 */
  .icon-freeze-road::before { content: "\\e631"; }

  /* 沙尘预警 */
  .icon-duststorm::before { content: "\\e62f"; }

  /* 大风预警 */
  .icon-wind::before { content: "\\e629"; }

  /* 多预警 */
  .icon-multi::before { content: "\\e638"; }

  /* 占位 */
  .icon-placeholder::before { content: "\\e637"; }

  .text-10,
  .iconColor-10,
  .text-30,
  .iconColor-30.text-40,
  .iconColor-40,
  .text-multi { color: white; }

  .text-20,
  .iconColor-20 { color: black; }
  .iconColor-multi { color: #ffde00; }
  .text-placeholder { color: #585858; }
  .iconColor-placeholder { color: #cacaca; }

  .color-10 { color: #62acff; }
  .color-20 { color: #ffde00; }
  .color-30 { color: #ff9403; }
  .color-40 { color: #f23030; }
  .color-multi { color: #ffde00; }
  .color-50 { color: #fff; }
`

const Icon = styled.i`
  font-family: 'alarmicon', sans-serif !important;
  font-size: 14px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
`

interface AlarmIconProps {
  alarm: AlarmData
}

const getBackground = (alarm: AlarmData) => {
  let baseCls = 'icon-background-alarmCircle'
  if (alarm.levelCode === 'placeholder') {
    baseCls = 'icon-background-alarmGlanceCircle'
  }
  const typeCls = `background-${alarm.levelCode}`
  const colorCls = `text-${alarm.levelCode}`
  return `${baseCls} ${typeCls} ${colorCls}`
}

const getAlarmIcon = (alarm: AlarmData) => {
  const typeCls = `icon-${alarm.typeCode}`
  const colorCls = `iconColor-${alarm.levelCode}`
  return `${typeCls} ${colorCls} color-${alarm.levelCode}`
}

const AlarmIcon: React.FC<AlarmIconProps> = props => {
  const { alarm } = props

  return (
    <span className={getBackground(alarm)}>
      <IconFont />
      <Icon className={getAlarmIcon(alarm)} />
    </span>
  )
}

export default AlarmIcon
