<template>
  <!-- <transition name="table"> -->
  <table class="table">
    <thead>
      <tr>
        <th :key="item" v-for="item in head">{{item}}</th>
      </tr>
    </thead>
    <transition-group name="table-tbody">
      <tbody>
        <tr :key="item.id" v-for="(item) in store.item">
          <td>{{ item.name }}</td>
          <td>{{ item.today.confirm }}</td>
          <td>{{ item.total.confirm }}</td>
          <td>{{ item.total.heal }}</td>
          <td>{{ item.total.dead }}</td>
        </tr>
      </tbody>
    </transition-group>
  </table>
  <!-- </transition> -->
</template>

<script setup lang="ts">
import { useConterStore } from '@/stores/counter'
import "animate.css"

let store = useConterStore()
let head = ["地区", "新增确诊", "累计确诊", "治愈", "死亡"]

</script>

<style scoped lang="less">
@itemColor: #41b0db;
@itemBg: #223651;
@itemBorder: #212028;

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