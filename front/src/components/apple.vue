<template>
  <div>
    {{store.count}}
    <button @click="inc">applebtn</button>
  </div>
</template>

<script setup lang="ts">
import { useConterStore } from "@/stores/counter"
const store = useConterStore()

function inc() {
  store.increase()
}
</script>

<style scoped lang="less">

</style>