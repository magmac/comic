<template>
  <Topbar :page-name="state.title" />
  <el-skeleton :loading="!state.tags.length" animated :count="5">
    <template #template>
      <el-skeleton-item variant="text" />
    </template>
    <template #default>
      <div v-if="state.tags.length" class="tabs">
        <router-link
          v-for="(item, index) in state.tags"
          :key="index"
          replace
          :to="`/video/ranking/${item.id}`"
          :style="{ flex: (100 / state.tags.length).toFixed(3) }"
        >
          {{ item.tag }}
        </router-link>
      </div>
    </template>
  </el-skeleton>
  <InfiniteScroll :count="state.videos.length" :showEmpty="false" @load="load">
    <ColumnsVideos :videos="state.videos" :loading="state.isLoading" @fav="toggleFav($event)" />
  </InfiniteScroll>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { onMounted, reactive, computed, watch } from 'vue'
import Topbar from '/@/components/blocks/Topbar.vue'
import ColumnsVideos from '/@/components/blocks/ColumnsVideos.vue'
import InfiniteScroll from '/@/components/blocks/InfiniteScroll.vue'

export default {
  name: 'Ranking',
  components: { Topbar, ColumnsVideos, InfiniteScroll },
  setup() {
    const route = useRoute()
    const { state: storeState, dispatch } = useStore()
    const { video } = storeState
    const state = reactive({
      isLoading: computed(() => storeState.loading),
      tags: computed(() => video.ranking.tags),
      videos: computed(() => video.ranking.videos),
      title: computed(() => (state.tags.length ? state.tags.find(item => (route.params.id | 0) === item.id).tag : ''))
    })

    const toggleFav = params => {
      dispatch('video/ranking/toggleFav', params)
    }

    watch(
      () => route.path,
      () => {
        if (route.name !== 'Ranking') return
        dispatch('video/ranking/fetchVideos', { tag: route.params.id, page: 1 })
      }
    )

    const load = page => {
      dispatch('video/ranking/fetchVideos', { tag: route.params.id, page })
    }

    onMounted(() => {
      dispatch('video/ranking/fetchData')
    })

    return {
      state,
      load,
      toggleFav
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/video/ranking.scss"></style>
