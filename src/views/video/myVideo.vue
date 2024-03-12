<template>
  <Topbar :page-name="title" />
  <div class="tabs">
    <router-link replace :to="{ path: '/video/myVideo/favorite' }"> 我的视频 </router-link>
    <router-link replace :to="{ path: '/video/myVideo/history' }"> 观看记录 </router-link>
  </div>
  <router-view />
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { reactive, computed, watch, ref } from 'vue'
import Topbar from '/@/components/blocks/Topbar.vue'

export default {
  name: 'MyVideo',
  components: { Topbar },
  setup() {
    const { getters } = useStore()
    const route = useRoute()
    const title = ref(route.meta.title)
    const state = reactive({
      likeBooks: computed(() => getters['bookshelf/likeBooks'])
    })

    watch(
      () => route.meta,
      () => {
        title.value = route.meta.title
      }
    )

    return {
      state,
      title
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/video/myVideo/index.scss"></style>
