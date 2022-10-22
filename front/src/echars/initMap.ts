import { useConterStore } from '@/stores/counter'

import * as echarts from "echarts"
// 一些静态资源文件
import { geoCoordMap } from '@/assets/geoMap' //城市经纬度
import '@/assets/china'//地图依赖的文件



import { OptionData } from "@/stores/type"
// 传入经纬度的数据集合
function createOption(p?: OptionData[]) {
  let data: Array<OptionData> | undefined
  if (p != undefined) {
    data = p
  } else {
    data = [
      {
        name: "内蒙古",
        value: [110.3467, 41.4899]
      },
    ];
  }
  const option = {
    backgroundColor: "black",
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "120%",
      itemStyle: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
      },
      emphasis: {
        areaColor: "#0f5d9d",
      },
      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
          },
          label: {
            show: true,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "120%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放,能不能拖拽
        // scaleLimit: {
        //   //滚轮缩放的极限控制
        //   min: 1,
        //   max: 1,
        // },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        name: 'Top 5',
        type: 'scatter',
        coordinateSystem: 'geo',
        // symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        symbolSize: [30, 30],
        symbol: 'pin',
        // symbolOffset: [0, '-40%'],
        label: {
          show: true,
          color: "#fff",
          formatter(value: any): number {
            return value.data.value[2]
          }
        },
        itemStyle: {
          color: '#00aeed', //标志颜色
        },
        data: data,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        zlevel: 1
      },
    ],
  };
  return option
}

async function initMap() {
  const store = useConterStore()
  await store.getList()
  const city = store.list.data.diseaseh5Shelf.areaTree[0].children

  const data = city.map(v => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm), //拼接到原数据上,确诊人数
      children: v.children
    }
  })

  const option = createOption(data)

  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('main') as HTMLElement);
  // 初始化中间的地图
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  // store.items = 
  myChart.on("click", (e: any) => {
    console.log(e.data.children);
    store.$patch((state) => {
      state.items = e.data.children
    })
  })
}

export {
  initMap
}