<template>
  <div class="box">
    <div class="box-left"></div>
    <div class="box-center" id="main"></div>
    <div class="box-right"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useConterStore } from '@/stores/counter'

import * as echarts from "echarts"
import {data, option, bindData } from "@/echars/map"

// 一些静态资源文件
import { geoCoordMap } from '@/assets/geoMap' //城市经纬度
import '@/assets/china'//地图依赖的文件



const store = useConterStore()
onMounted(async () => {

  await store.getList()
  const city = store.list.data.diseaseh5Shelf.areaTree[0].children
  const data = city.map(v=>{
    console.log(v.name, geoCoordMap[v.name].concat(v.total.nowConfirm));
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm)
    }
  })
  console.log(data);
  
  bindData(data)

  console.log(city);

  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('main') as HTMLElement);
  // 初始化中间的地图
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
})

</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  height: 100%;
}

.box {
  height: 100%;
  display: flex;

  &-left {
    height: 100vh;
    width: 200px;
    background-color: aqua;
  }

  &-center {
    flex: 1;
  }

  &-right {
    width: 200px;
    background-color: red;
  }
}
</style>


