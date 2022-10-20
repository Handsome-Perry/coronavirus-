<template>
  <div class="box">
    <div class="box-left"></div>
    <div class="box-center"></div>
    <div class="box-right"></div>
  </div>
</template>

<script setup lang="ts">
import {getlist} from "./network/index"
console.log(getlist().then(res=>{
  console.log(res);
  
}))
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,body,#app{
  height: 100%;
}
.box{
  height: 100%;
  display: flex;
  &-left{
    height: 100vh;
    width: 400px;
    background-color: aqua;
  }
  &-center{
    flex: 1;
  }
  &-right{
    width: 400px;
    background-color: red;
  }
}
</style>


