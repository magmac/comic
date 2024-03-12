<template>
  <Topbar :page-name="state.title" />
  <el-skeleton :loading="!state.tags.length" animated :count="5">
    <template #template>
      <el-skeleton-item variant="text" />
    </template>
    <template #default>
      <ul class="tags">
        <li v-for="(item, index) in state.tags" :key="index">
          <router-link replace :to="`/video/tag/${item.id}`">
            {{ item.tag }}
          </router-link>
        </li>
      </ul>
    </template>
  </el-skeleton>
  <InfiniteScroll :count="state.videos.length" :showEmpty="false" @load="load">
    <ColumnsVideos :videos="state.videos" :loading="state.isLoading" @fav="toggleFav($event)" />
  </InfiniteScroll>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, reactive, computed, watch } from 'vue'
import Topbar from '/@/components/blocks/Topbar.vue'
import ColumnsVideos from '/@/components/blocks/ColumnsVideos.vue'
import InfiniteScroll from '/@/components/blocks/InfiniteScroll.vue'

export default {
  name: 'Tag',
  components: { Topbar, ColumnsVideos, InfiniteScroll },
  setup() {
    const route = useRoute()
    const { state: storeState, dispatch } = useStore()
    const { video } = storeState
    const state = reactive({
      isLoading: computed(() => storeState.loading),
      tags: computed(() => video.tag.tags),
      videos: computed(() => video.tag.videos),
      title: computed(() => (state.tags.length ? state.tags.find(item => (route.params.id | 0) === item.id).tag : ''))
    })

    const toggleFav = params => {
      dispatch('video/tag/toggleFav', params)
    }

    watch(
      () => route.path,
      () => {
        if (route.name !== 'Tag') return
        dispatch('video/tag/fetchVideos', { tag: route.params.id, page: 1 })
      }
    )

    const load = page => {
      dispatch('video/tag/fetchVideos', { tag: route.params.id, page })
    }

    onMounted(() => {
      dispatch('video/tag/fetchData')
    })

    onUnmounted(() => {
      dispatch('video/tag/clearData')
    })

    return {
      state,
      load,
      toggleFav
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/video/tag.scss"></style>
