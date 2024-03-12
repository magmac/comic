<template>
  <Topbar />
  <InfiniteScroll :total="state.total" :count="state.currentTotal" @load="load">
    <div class="box">
      <div class="item th">
        <div class="dateD">日期</div>
        <div class="name">书名</div>
        <div class="beans">消耗金币</div>
      </div>
      <div v-for="(value, index) in state.list" :key="index">
        <div class="dateYM">{{ value.month }}</div>
        <div v-for="(item, idx) in value.items" :key="idx" class="item">
          <div class="dateD">{{ item.day }}</div>
          <div class="name">
            <p>{{ item.name }}</p>
            <span>{{ item.chapter || '视频' }}</span>
          </div>
          <div class="beans"><i class="el-icon-coin" /> {{ item.beans }}</div>
        </div>
      </div>
    </div>
  </InfiniteScroll>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, onMounted, computed } from 'vue'
import InfiniteScroll from '/@/components/blocks/InfiniteScroll.vue'
import Topbar from '/@/components/blocks/Topbar.vue'

export default {
  name: 'Record',
  components: {
    Topbar,
    InfiniteScroll
  },
  setup() {
    const { dispatch, getters } = useStore()

    const state = reactive({
      list: computed(() => getters['record/list']),
      currentTotal: computed(() => getters['record/currentTotal']),
      total: computed(() => getters['record/total'])
    })

    const load = page => {
      dispatch('record/fetchData', page)
    }

    onMounted(() => {
      dispatch('record/fetchData', 1)
    })

    return {
      state,
      load
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/record.scss"></style>
