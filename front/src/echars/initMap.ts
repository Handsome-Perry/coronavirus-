import { useConterStore } from '@/stores/counter'

import * as echarts from "echarts"
// 一些静态资源文件
import { geoCoordMap } from '@/assets/geoMap' //城市经纬度
import '@/assets/china'//地图依赖的文件



// import { OptionData } from "@/stores/type"
// 传入经纬度的数据集合

// 初始化地图的option
const option = {

  // 一些配置
  series: [
    {
      type: "map",
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"], //地图位置
      layoutSize: "100%",
      zoom: 1, //当前视角的缩放比例
      // roam: true, //是否开启平游或缩放
      scaleLimit: {
        //滚轮缩放的极限控制
        min: 1,
        max: 2,
      },
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
    },
    {
      type: 'scatter',
      coordinateSystem: 'geo',
      //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
      // symbolSize: [30,120],
      // symbolOffset:[0, '-40%'] ,
      symbol: 'pin',
      symbolSize: [45, 45],
      label: {
        show: true,
        color: '#fff',
      },
      itemStyle: {
        color: '#1E90FF', //标志颜色
      },
    },
  ],

  // 地图
  geo: {
    map: "china",
    aspectScale: 0.8,
    layoutCenter: ["50%", "50%"],
    layoutSize: "100%",
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
          show: false,
          color: "#FFFFFF",
          fontSize: 12,
        },
      },
    ],
  },
}


async function initMap() {
  // 请求数据获取list
  const store = useConterStore()
  await store.getList();
  store.item = store.list.data.diseaseh5Shelf.areaTree[0].children[5].children
  // 基于准备好的dom，初始化echarts实例
  let map = echarts.init(document.getElementById('main') as HTMLElement);
  map!.setOption(option);

  // 获取整理地图数据
  const data = store.list.data.diseaseh5Shelf.areaTree[0].children.map(v => {
    return {
      name: v.name,
      value: geoCoordMap[v.name],
      label: v.total.nowConfirm,
      children: v.children,
    }
  })
  // 设置地图数据
  map!.setOption({
    series: [
      {
        type: 'map',
        data: data,
      },
      {
        type: 'scatter',
        data: data,
        label: {
          // 展示标签
          formatter: (value: any) => {
            return value.data.label
          }
        },
      }
    ]
  })

  // 设置地图自适应
  window.addEventListener("resize", () => {
    map.resize();
  })
  map.on("click", (e: any) => {
    let children = e.data.children.map((v: any) =>{
      v.id = Math.random()
      return v
    })
    
    store.$patch((state) => {
      state.item = children
    })
  })
}

export {
  initMap
}