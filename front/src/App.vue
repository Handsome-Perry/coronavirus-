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
  overflow: hidden;
}

.box {
  height: 100%;
  display: flex;
  background: url("@/assets/bg.jpg");
  background-size: cover;
  &-left {
    width: 350px;
    flex: 0 0 400px;
  }

  &-center {
    flex: 1;
  }

  &-right {
    flex: 0 0 400px;
  }
}
</style>


