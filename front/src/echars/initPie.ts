import * as echarts from "echarts"
import { useConterStore } from '@/stores/counter'

export async function initPie() {
  let store = useConterStore()

  let pie = echarts.init(document.getElementById('box-left-line1') as HTMLElement);
  console.log(pie);

  console.log(store.cityDetail);

  pie!.setOption({
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
          }
        },
        labelLine: {
          show: true
        },
        data: store.cityDetail.map(v => {
          return {
            name: v.city,
            value: v.nowConfirm
          }
        })
      }
    ]
  })
}
