import { defineStore } from 'pinia'
import { getApiList } from '../network'
import { RootObject, Children, ChinaAdd, ChinaTotal, StatisGradeCityDetail } from './type'
export const useConterStore = defineStore("store", {
  state: () => {
    return {
      list: <RootObject>{},
      item: <Children[]>[],
      chinaAdd: <ChinaAdd>{},
      chinaTotal: <ChinaTotal>{},
      cityDetail: <StatisGradeCityDetail[]>[]
    }
  },
  actions: {
    async getList() {
      const res = await getApiList()
      this.list = res.data,
      this.item = this.list.data.diseaseh5Shelf.areaTree[0].children[5].children
      this.chinaAdd = this.list.data.diseaseh5Shelf.chinaAdd;
      this.chinaTotal = this.list.data.diseaseh5Shelf.chinaTotal;
      this.cityDetail = this.list.data.statisGradeCityDetail.slice(0,10)
    },
  }
})