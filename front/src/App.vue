<template>
  <div class="box">
    <div class="box-left">
      <card></card>
      <!-- <transition name="box-left-line1"> -->
        <div class="box-left-line1" id="box-left-line1"></div>
      <!-- </transition> -->
      <!-- <transition name="box-left-line2"> -->
        <div class="box-left-line2" id="box-left-line2"></div>
      <!-- </transition> -->
    </div>
    <div class="box-center" id="main"></div>
    <div class="box-right">
      <cityInfo></cityInfo>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import cityInfo from "@/components/cityInfo.vue"
import card from "@/components/card.vue"
import { useConterStore } from '@/stores/counter'

import { initMap } from '@/echars/initMap'
import { initPie } from "@/echars/initPie"
import {initLine} from "@/echars/initLine"

let store = useConterStore()

onMounted(async () => {
  await store.getList();
  initMap()
  initPie()
  initLine()
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
  overflow: hidden;
}

.box {
  height: 100%;
  display: flex;
  background: url("@/assets/bg.jpg");
  background-size: cover;

  &-left {
    flex: 0 0 400px;
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
  }

  &-center {
    flex: 1;
  }

  &-right {
    flex: 0 0 400px;
  }
}
</style>


