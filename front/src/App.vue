<template>
  <div class="box">
    <div class="box-left"></div>
    <div class="box-center" id="main"></div>
    <div class="box-right">
      <cityInfo></cityInfo>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import cityInfo from "@/components/cityInfo.vue"

import { initMap } from '@/echars/initMap'

onMounted(async () => {
  initMap()
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
    // height: 100vh;
    flex-shrink: 0;
    width: 350px;
    background-color: aqua;
  }

  &-center {
    flex: 1;
  }

  &-right {
    width: 350px;
    background-color: red;
  }
}
</style>


