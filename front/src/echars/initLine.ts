import * as echarts from "echarts"
import { useConterStore } from '@/stores/counter'

export function initLine() {
  const store = useConterStore()
  let line = echarts.init(document.querySelector("#box-left-line2") as HTMLElement)
  line!.setOption({
    backgroundColor: "#223651",
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: store.cityDetail.map(v=>v.city)
    },
    yAxis: {
      type: 'value'
    },
    label:{
      show:true
    },
    series: [
      {
        data: store.cityDetail.map(v=>v.nowConfirm),
        type: 'line',
        smooth: true
      }
    ]
  })
}