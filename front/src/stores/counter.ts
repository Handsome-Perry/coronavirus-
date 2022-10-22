import { defineStore } from 'pinia'
import { getApiList } from '../network'
import { RootObject,Children } from './type'
export const useConterStore = defineStore("store", {
  state: () => {
    return {
      list: <RootObject>{},
      items: <Children[]>[]
    }
  },
  actions: {
    async getList() {
      const res = await getApiList()
      this.list = res.data
    },
  }
})