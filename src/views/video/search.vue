<template>
  <Topbar />
  <div class="search">
    <el-form class="form" @submit.prevent="handleSubmit">
      <el-input v-model="state.value" size="medium" placeholder="视频搜索" clearable>
        <template #append>
          <el-button icon="el-icon-search" native-type="submit" />
        </template>
      </el-input>
      <div class="words">
        <div class="label">热搜：</div>
        <div class="keywords">
          <router-link v-for="(word, index) in state.keywords" :key="index" :to="`/video/search/${word}`">
            {{ word }}
          </router-link>
        </div>
      </div>
      <AdvFlow :ad="state.ad_flow_31" />
    </el-form>
    <InfiniteScroll :count="state.videos.length" :showEmpty="false" @load="load">
      <FullVideos :videos="state.videos" :loading="state.isLoading" @fav="toggleFav($event)" />
    </InfiniteScroll>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, computed, watch } from 'vue'
import InfiniteScroll from '/@/components/blocks/InfiniteScroll.vue'
import Topbar from '/@/components/blocks/Topbar.vue'
import FullVideos from '/@/components/blocks/FullVideos.vue'
import AdvFlow from '/@/components/blocks/AdvFlow.vue'

export default {
  name: 'SearchVideo',
  components: {
    InfiniteScroll,
    Topbar,
    FullVideos,
    AdvFlow
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { keyword } = route.params
    const { state: storeState, dispatch, getters } = useStore()
    const { video } = storeState
    const state = reactive({
      isLoading: computed(() => storeState.loading),
      videos: computed(() => video.search.videos),
      keywords: computed(() => video.search.keywords),
      ad_flow_31: computed(() => getters['ad_flow_31']),
      value: keyword
    })

    const load = page => {
      dispatch('video/search/fetchData', { keyword, page })
    }

    const toggleFav = params => {
      dispatch('video/search/toggleFav', params)
    }

    const handleSubmit = () => {
      if (!state.value) return
      router.replace({
        path: `/video/search/${state.value}`
      })
    }

    watch(
      () => route.params,
      curr => {
        if (!curr.keyword) return
        state.value = curr.keyword
        dispatch('video/search/fetchData', { keyword: curr.keyword, page: 1 })
      }
    )

    onMounted(() => {
      dispatch('video/search/fetchData', { keyword, page: 1 })
    })

    return {
      state,
      load,
      handleSubmit,
      toggleFav
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/video/search.scss"></style>
