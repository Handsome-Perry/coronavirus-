<template>
  <div>
    <button @click="btnclick">btn</button>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
// import HelloWorld from "./components/HelloWorld.vue"
// const messageString: string = "1"
// const messageNumber: number = 0

function btnclick() {
  // "http://localhost:3000/list/"
  // fetch("http://localhost:5173/api1/api/list/")
  //   .then(response => {
  //     // console.log(response);
  //     return response.json()
  //   }).then((res) => {
  //     console.log(res);
  //   })

  axios.get("http://localhost:5173/api1/api/list/").then(res=>{
    console.log(res);
  })
}

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>


