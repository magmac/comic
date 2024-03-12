<template>
  <HomeHeader />
  <MenuNav />
  <div class="video">
    <Heading title="视频圈子" :path="{ path: '/video/tag/1' }" />
    <InfiniteScroll :count="state.videos.length" :initPage="state.initPage" :showEmpty="false" @load="load">
      <FullVideos :videos="state.videos" :ad="state.ad_video_30" :loading="state.isLoading" @fav="toggleFav($event)" />
    </InfiniteScroll>
  </div>
  <MenuFooter />
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, reactive, computed } from 'vue'
import HomeHeader from '/@/components/video/Header.vue'
import MenuFooter from '/@/components/blocks/Footer.vue'
import MenuNav from '/@/components/video/Menu.vue'
import FullVideos from '/@/components/blocks/FullVideos.vue'
import InfiniteScroll from '/@/components/blocks/InfiniteScroll.vue'
import Heading from '/@/components/blocks/Heading.vue'

export default {
  name: 'Medio',
  components: {
    HomeHeader,
    MenuFooter,
    MenuNav,
    FullVideos,
    InfiniteScroll,
    Heading
  },
  setup() {
    const { state: storeState, dispatch, getters } = useStore()
    const { video, pagesize } = storeState
    const state = reactive({
      isLoading: computed(() => storeState.loading),
      videos: computed(() => video.videos),
      ad_video_30: computed(() => getters['ad_video_30']),
      initPage: 1
    })

    const load = page => {
      dispatch('video/randomVideos', page)
    }

    const toggleFav = params => {
      dispatch('video/toggleFav', params)
    }

    onMounted(() => {
      if (state.videos.length) {
        if (state.videos.length > pagesize) state.initPage = Math.ceil(state.videos.length / pagesize)
        return
      }
      dispatch('video/videos')
    })

    return {
      state,
      load,
      toggleFav
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/video/index.scss"></style>
