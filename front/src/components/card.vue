<template>
    <div class="card">
      <section>
        <div>
          <span>较上日+</span>
          <span>{{ store.chinaAdd.localConfirmH5 }}</span>
        </div>
        <div>{{ store.chinaTotal.localConfirm }}</div>
        <div>本土现有确诊</div>
      </section>
      <section>
        <div>
          <span>较上日+</span>
          <span>{{ store.chinaAdd.nowConfirm }}</span>
        </div>
        <div>{{ store.chinaTotal.nowConfirm }}</div>
        <div>现有确诊</div>
      </section>
      <section>
        <div>
          <span>较上日+</span>
          <span>{{ store.chinaAdd.confirm }}</span>
        </div>
        <div>{{ store.chinaTotal.confirm }}</div>
        <div>累计确诊</div>
      </section>
      <section>
        <div>
          <span>较上日+</span>
          <span>{{ store.chinaAdd.noInfect }}</span>
        </div>
        <div>{{ store.chinaTotal.noInfect }}</div>
        <div>无症状感染者</div>
      </section>
      <section>
        <div>
          <span>较上日+</span>
          <span>{{ store.chinaAdd.importedCase }}</span>
        </div>
        <div>{{ store.chinaTotal.importedCase }}</div>
        <div>境外输入</div>
      </section>
      <section>
        <div>
          <span>较上日+</span>
          <span>{{ store.chinaAdd.dead }}</span>
        </div>
        <div>{{ store.chinaTotal.dead }}</div>
        <div>累计死亡</div>
      </section>
    </div>

</template>

<script setup lang="ts">
import { useConterStore } from '@/stores/counter'


let store = useConterStore()
</script>

<style scoped lang="less">
@itemColor: #41b0db;
@itemBg: #223651;
@itemBorder: #212028;


.card {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;

  section {
    background: @itemBg;
    border: 1px solid @itemBorder;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    div:nth-child(1) {
      span:nth-child(2) {
        color: @itemColor;
        font-weight: bolder;
      }
    }

    div:nth-child(2) {
      color: @itemColor;
      margin: 10px 0;
      font-size: 20px;
      font-weight: bolder;
    }
  }
}
</style>