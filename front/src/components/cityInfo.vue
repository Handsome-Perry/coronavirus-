<template>
  <table class="right-info">
    <tr>
      <th v-for="item in head">{{item}}</th>
    </tr>
    <tr v-for="item in store.items">
      <td>{{item.name}}</td>
      <td>{{item.today.confirm}}</td>
      <td>{{item.total.confirm}}</td>
      <td>{{item.total.heal}}</td>
      <td>{{item.total.dead}}</td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { useConterStore } from '@/stores/counter'

let store = useConterStore()
let head = ["地区", "新增确诊", "累计确诊", "治愈", "死亡"]


</script>

<style scoped lang="less">
.right-info {
  // width: 350px;
  display: flex;
  flex-direction: column;

}

.right-info tr {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

td,th {
  border: 1px solid black;
  width: 20%;
}
</style>