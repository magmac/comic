<template>
  <Topbar />
  <AdvFlow :ad="state.ad_flow_28" />
  <div class="search">
    <el-form class="form" @submit.prevent="handleSubmit">
      <el-input v-model="state.value" size="medium" placeholder="书籍搜索" clearable>
        <template #append>
          <el-button icon="el-icon-search" native-type="submit" />
        </template>
      </el-input>
    </el-form>
    <InfiniteScroll :count="state.books.length" :showEmpty="false" @load="load">
      <FullBooks :books="state.books" page-jump-way="directory" :loading="state.isLoading" />
    </InfiniteScroll>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, computed, watch } from 'vue'
import InfiniteScroll from '/@/components/blocks/InfiniteScroll.vue'
import Topbar from '/@/components/blocks/Topbar.vue'
import FullBooks from '/@/components/blocks/FullBooks.vue'
import AdvFlow from '/@/components/blocks/AdvFlow.vue'
export default {
  name: 'Search',
  components: {
    InfiniteScroll,
    Topbar,
    FullBooks,
    AdvFlow
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { keyword } = route.params
    const { state: storeState, dispatch, getters } = useStore()
    const state = reactive({
      isLoading: computed(() => storeState.loading),
      books: computed(() => getters['search/cartoons']),
      ad_flow_28: computed(() => getters['ad_flow_28']),
      value: keyword
    })
    const load = page => {
      dispatch('search/fetchData', { keyword, page })
    }

    const handleSubmit = () => {
      if (!state.value) return
      router.replace({
        path: `/search/${state.value}`
      })
    }

    watch(
      () => route.params,
      curr => {
        if (!curr.keyword) return
        dispatch('search/fetchData', { keyword: curr.keyword, page: 1 })
      }
    )

    onMounted(() => {
      dispatch('search/fetchData', { keyword, page: 1 })
    })

    return {
      state,
      load,
      handleSubmit
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/search.scss"></style>
