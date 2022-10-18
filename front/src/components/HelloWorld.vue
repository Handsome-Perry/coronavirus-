<script setup lang="ts">
import { ref } from 'vue'
interface lpy{
  value:string
}
let sb:lpy={
  constructor: function(){},
  value:'456'
}
let zb = ref(sb)
function fn(){
  if(zb!=null){
    console.log('节点', zb.value.value);
  }
}
</script>

<template>
  <input type="text" ref="zb" @input="fn">
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
