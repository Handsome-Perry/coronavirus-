import { defineStore } from 'pinia'
import { getApiList } from '../network'
import { RootObject } from './type'
export const useConterStore = defineStore("store", {
  state: () => {
    return {
      list: <RootObject>{},
      count: 0
    }
  },
  actions: {
    async getList() {
      const res = await getApiList()
      console.log(res.data);
      this.list = res.data
    },
    increase() {
      this.count++
    }
  }
})