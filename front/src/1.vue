<template>
  <div :style="{ background: `url(${bg})`, backgroundSize: 'cover' }" class="box">
    <div class="box-left">
      <div class="box-left-card">
        <section>
          <div>
            <span>较上日</span>
            <span>{{ chinaAddDisp.localConfirmH5 }}</span>
          </div>
          <div>{{ store.chinaTotal.localConfirm }}</div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>
            <span>较上日</span>
            <span>{{ chinaAddDisp.nowConfirm }}</span>
          </div>
          <div>{{ store.chinaTotal.nowConfirm }}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>
            <span>较上日</span>
            <span>{{ chinaAddDisp.confirm }}</span>
          </div>
          <div>{{ store.chinaTotal.confirm }}</div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>
            <span>较上日</span>
            <span>{{ chinaAddDisp.noInfect }}</span>
          </div>
          <div>{{ store.chinaTotal.noInfect }}</div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>
            <span>较上日</span>
            <span>{{ chinaAddDisp.importedCase }}</span>
          </div>
          <div>{{ store.chinaTotal.importedCase }}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>
            <span>较上日</span>
            <span>{{ chinaAddDisp.dead }}</span>
          </div>
          <div>{{ store.chinaTotal.dead }}</div>
          <div>累计死亡</div>
        </section>
      </div>
      <transition name="box-left-line1">
        <div class="box-left-line1" />
      </transition>
      <transition name="box-left-line2">
        <div class="box-left-line2" />
      </transition>
    </div>
    <transition enter-active-class="animate__animated animate__fadeIn">
      <div id="china" class="box-center" />
    </transition>
    <div class="box-right">
      <div class="box-right-header">
        <div class="box-right-header-time">
          <div>
            <p class="requestTime">
              <span>上次请求时间</span>
              <span class="requestTimeNum">{{ requestTime }}</span>
            </p>
          </div>
          <div>
            <p class="time">
              <span>统计截至</span>
              <span class="timeNum">{{ store.lastUpdateTime }}</span>
            </p>
          </div>
        </div>
        <div class="box-right-header-button">
          <button class="switchButton" @click="switchChange">
            <span>{{ button_text }}</span>
          </button>
        </div>
      </div>
      <div>
        <transition name="table">
          <table v-show="table_flag" class="table">
            <thead>
              <tr>
                <th>地区</th>
                <th>新增确诊</th>
                <th>累计确诊</th>
                <th>治愈</th>
                <th>死亡</th>
              </tr>
            </thead>
            <transition-group name="table-tbody">
              <tr :key="item.name" v-for="(item) in store.item">
                <td>{{ item.name }}</td>
                <td>{{ item.today.confirm }}</td>
                <td>{{ item.total.confirm }}</td>
                <td>{{ item.total.heal }}</td>
                <td>{{ item.total.dead }}</td>
              </tr>
            </transition-group>
          </table>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, onBeforeUnmount } from 'vue'
import bg from './assets/bg.jpg'
import { useMainStore } from './stores'
import * as echarts from 'echarts';
import './assets/china'
import { geoCoordMap } from './assets/geoMap'
import 'animate.css'
import dayjs from 'dayjs'
import type { ChinaAddDisp } from './stores/type'
import { STATEMENT_OR_BLOCK_KEYS } from '@babel/types';

// 实例挂载钩子函数
onMounted(async () => {
  console.log("进入加载")
  // 初始化图表Dom和配置项
  await initChartDom();
  initMap();
  initLineRace1();
  initLineRace2();
  // 获得动态数据并显示
  await store.getList();
  chinaAddDispSign();
  setMapData();
  await store.getCityList(cityName.value);
  setTableData();
  setLineRaceData1();
  setLineRaceData2();
});

// 卸载前清除计时器，销毁图表Dom
onBeforeUnmount(() => {
  clearInterval(timer);
  disposeChartDom();
  console.log("页面卸载")
})

const store = useMainStore()

// 图表Dom节点管理
const initChartDom = async () => {
  if (map === undefined) {
    map = echarts.init(document.querySelector('#china') as HTMLElement);
    lineRace1 = echarts.init(document.querySelector('.box-left-line1') as HTMLElement);
    lineRace2 = echarts.init(document.querySelector('.box-left-line2') as HTMLElement);
  }
}
const disposeChartDom = () => {
  if (map !== undefined) {
    map.dispose();
    lineRace1.dispose();
    lineRace2.dispose();
  }
}

// 定时器，目前5s自动获取一次数据并尝试更新视图
const timer = setInterval(async () => {
  await store.getList();
  chinaAddDispSign();
  setMapData();
  setTableData();
  requestTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
}, 5 * 1000);

const table_flag = ref(true)
const button_text = ref("收起")
const cityName = ref<string>("上海")
const requestTime = ref<string>(dayjs().format('YYYY-MM-DD HH:mm:ss'))
let chinaAddDisp = ref<ChinaAddDisp>({
  importedCase: '',
  noInfectH5: '',
  confirm: '',
  nowConfirm: '',
  suspect: '',
  nowSevere: '',
  noInfect: '',
  localConfirm: '',
  localConfirmH5: '',
  heal: '',
  dead: '',
})

// 修正正数和负数显示的问题
const chinaAddDispSign = () => {
  console.log("进入chinaAddDispSign");

  // 防止ts遍历属性报错对象没有声明string类型可用
  let key: (keyof ChinaAddDisp);
  for (key in chinaAddDisp.value) {
    if (store.chinaAdd[key] >= 0) {
      chinaAddDisp.value[key] = '+' + store.chinaAdd[key]
    } else {
      chinaAddDisp.value[key] = '' + store.chinaAdd[key]
    }
  }
  console.log("调用了chinaAddDispSign");
  console.log(chinaAddDisp.value);
}

//先声明图标实例
let lineRace1!: echarts.ECharts;
let lineRace2!: echarts.ECharts;
let map!: echarts.ECharts;

// 初始化配置项
const initLineRace1 = () => lineRace1!.setOption({

  backgroundColor: '#223651',
  // 入场动画和更新动画时长
  animationDuration: 3000,
  animationDurationUpdate: 1500,
  // 动画缓动
  animationEasing: 'cubicInOut',
  animationEasingUpdate: 'cubicInOut',
  // 标题
  title: {
    textStyle: {
      color: "#fff",
    }
  },
  // 提示框
  tooltip: {
    order: 'valueDesc',
    trigger: 'axis'
  },
  // 图例
  legend: [{
    show: true,
    top: '8%',
    right: '0%',
    orient: 'horizontal',
    textStyle: {
      color: "#fff",
    },
  }],
  xAxis: {
    type: 'category',
    nameTextStyle: {
      color: '#fff',
    },
    axisLine: {
      lineStyle: {
        color: '#fff',
      }
    },
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#fff',
      }
    },
    nameTextStyle: {
      color: '#fff',
    },
    axisLine: {
      lineStyle: {
        color: '#fff',
      }
    },
  },
  // 缩放
  dataZoom: [
    {
      // inside 内置于图表的缩放组件，slider 独立于图表外的缩放组件
      type: "inside",
      xAxisIndex: [0],
      start: 80,
      end: 100,
    },
    {
      type: 'inside',
      yAxisIndex: [0],
      start: 0,
      end: 100
    },
  ],
  // 设置上下左右边距
  grid: {
    top: '15%',
    left: '3%',
    right: '5%',
    bottom: '5%',
    containLabel: true
  },
  // 无障碍
  aria: {
    show: true
  },
});
const initLineRace2 = () => lineRace2!.setOption({

  backgroundColor: '#223651',
  // 入场动画和更新动画时长
  animationDuration: 3000,
  animationDurationUpdate: 1500,
  // 动画缓动
  animationEasing: 'cubicInOut',
  animationEasingUpdate: 'cubicInOut',
  // 标题
  title: {
    textStyle: {
      color: "#fff",
    }
  },
  // 提示框
  tooltip: {
    order: 'valueDesc',
    trigger: 'axis'
  },
  // 图例
  legend: [{
    show: true,
    top: '8%',
    right: '0%',
    orient: 'horizontal',
    textStyle: {
      color: "#fff",
    },
  }],
  xAxis: {
    type: 'category',
    nameTextStyle: {
      color: '#fff',
    },
    axisLine: {
      lineStyle: {
        color: '#fff',
      }
    },
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#fff',
      }
    },
    nameTextStyle: {
      color: '#fff',
    },
    axisLine: {
      lineStyle: {
        color: '#fff',
      }
    },
  },
  // 缩放
  dataZoom: [
    {
      // inside 内置于图表的缩放组件，slider 独立于图表外的缩放组件
      type: "inside",
      xAxisIndex: [0],
      start: 80,
      end: 100,
    },
    {
      type: 'inside',
      yAxisIndex: [0],
      start: 0,
      end: 100
    },
  ],
  // 设置上下左右边距
  grid: {
    top: '15%',
    left: '3%',
    right: '5%',
    bottom: '5%',
    containLabel: true
  },
  // 无障碍
  aria: {
    show: true
  },
});

// 动态数据设置
const setLineRaceData1 = () => {

  lineRace1!.setOption({
    // 标题
    title: {
      text: `${cityName.value}疫情新增趋势`,
    },
    xAxis: {
      data: store.cityData.map(v => v.year + '.' + v.date),
    },
    // 动态数据绑定
    series: [
      {
        name: '新增确诊',
        type: 'line',
        smooth: true,
        data: store.cityData.map(v => v.newConfirm)
      },
      {
        name: '新增治愈',
        type: 'line',
        smooth: true,
        data: store.cityData.map(v => v.newHeal)
      },
      {
        name: '新增死亡',
        type: 'line',
        smooth: true,
        data: store.cityData.map(v => v.newDead)
      }
    ],
  })
}
const setLineRaceData2 = () => {

  lineRace2!.setOption({
    // 标题
    title: {
      text: `${cityName.value}疫情总计趋势`,
    },
    xAxis: {
      data: store.cityData.map(v => v.year + '.' + v.date),
    },
    // 动态数据绑定
    series: [
      {
        name: '现有确诊',
        type: 'line',
        smooth: true,
        data: store.cityData.map(v => { return (v.confirm - v.heal - v.dead) })
      },
      {
        name: '累计确诊',
        type: 'line',
        smooth: true,
        data: store.cityData.map(v => v.confirm)
      },
      {
        name: '累计治愈',
        type: 'line',
        smooth: true,
        data: store.cityData.map(v => v.heal)
      },
      {
        name: '累计死亡',
        type: 'line',
        smooth: true,
        data: store.cityData.map(v => v.dead)
      }
    ],
  })
}

// 改变动态折线图数据
const changeLineRaceData = async () => {

  await store.getCityList(cityName.value);
  setLineRaceData1()
  setLineRaceData2()
}



// 设置地图数据
const setMapData = () => {

  const data = store.list.diseaseh5Shelf.areaTree[0].children.map(v => {
    return {
      name: v.name,
      value: geoCoordMap[v.name],
      label: v.total.nowConfirm,
      children: v.children,
    }
  })

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
}

// 响应式改变图表大小
window.onresize = function () {
  lineRace1.resize();
  lineRace2.resize();
  map.resize()
};

// 设置表格数据
const setTableData = () => {

  store.list.diseaseh5Shelf.areaTree[0].children.map((v) => {
    if (v.name === cityName.value) {
      // 避免浅拷贝
      store.item = JSON.parse(JSON.stringify(v.children))
    }
  })
}

// 右侧表格展开收起按钮
const switchChange = () => {
  table_flag.value = !table_flag.value;

  if (table_flag.value) {
    button_text.value = '收起'
  } else {
    button_text.value = '显示'
  }
}
</script>

<style lang="less" scoped>
html,
body,
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
@itemColor: #41b0db;
@itemBg: #223651;
@itemBorder: #212028;
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  &-left {
    width: 400px;
    color: white;
    display: flex;
    flex-flow: column;
    &-line1 {
      height: 280px;
      margin-top: auto;
      &-enter-active {
        animation: fadeIn 0.25s;
      }
      &-leave-active {
        animation: fadeOut 0.25s;
      }
    }
    &-line2 {
      height: 280px;
      margin-top: auto;
    }
    &-card {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;
      section {
        background: @itemBg;
        border: 1px solid @itemBorder;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        div:nth-child(1) {
          span:nth-child(2) {
            color: @itemColor;
            font-weight: bolder;
          }
        }
        div:nth-child(2) {
          color: @itemColor;
          margin: 10px 0;
          font-size: 20px;
          font-weight: bolder;
        }
      }
    }
  }
  &-center {
    flex: 1;
  }
  &-right {
    width: 400px;
    &-header {
      display: flex;
      flex-direction: row;
      &-time {
        display: flex;
        flex-direction: column;
        .requestTime {
          background: @itemBg;
          padding: 5px 10px;
          border: 1px solid @itemBorder;
          color: white;
          text-align: center;
          font-weight: bolder;
        }
        .requestTimeNum {
          margin-left: 5px;
          color: @itemColor;
        }
        .time {
          background: @itemBg;
          padding: 5px 10px;
          border: 1px solid @itemBorder;
          color: white;
          text-align: center;
          font-weight: bolder;
        }
        .timeNum {
          margin-left: 5px;
          color: @itemColor;
        }
      }
      &-button {
        display: flex;
        .switchButton {
          display: block;
          background: @itemBg;
          padding: 5px 10px;
          margin-top: auto;
          border: 1px solid @itemBorder;
          color: @itemColor;
          text-align: center;
          font-size: 16px;
          font-weight: bolder;
        }
      }
    }
  }
}
.table {
  width: 100%;
  background: @itemBg;
  color: white;
  border: 0 solid @itemBorder;
  border-top: none;
  border-spacing: 0;
  &-enter-active {
    animation: fadeIn 0.25s;
  }
  &-leave-active {
    animation: fadeOut 0.25s;
  }
  tr {
    th {
      padding: 5px;
      white-space: nowrap;
      border: 1px solid @itemBorder;
    }
    td {
      padding: 5px 10px;
      width: 100px;
      white-space: nowrap;
      text-align: center;
      border: 1px solid @itemBorder;
    }
  }
  &-tbody {
    &-enter-active {
      animation: flipInY 0.5s;
    }
  }
}
</style>