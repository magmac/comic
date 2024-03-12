<template>
  <AppBar />
  <router-view />
</template>

<script>
import { onMounted, computed, watch, reactive, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'App',
  components: {
    AppBar: defineAsyncComponent(() => import('/@/components/blocks/AppBar.vue'))
  },
  setup() {
    const { dispatch, state: storeState, getters } = useStore()
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      linkid: computed(() => storeState.auth.linkid),
      platform: computed(() => storeState.auth.platform),
      isAppInitialComplete: computed(() => storeState.isAppInitialComplete),
      isVideoMaintain: computed(() => getters['isVideoMaintain'])
    })

    watch([() => state.isAppInitialComplete, () => route.path], newValue => {
      if (newValue[0] && newValue[1].indexOf('video') !== -1 && state.isVideoMaintain) videoMaintainMessage()
    })

    const getSearchParams = param => {
      return new URL(location.href).searchParams.get(param)
    }

    const videoMaintainMessage = () => {
      ElMessageBox.confirm('视频服务维护中，观看请下载APP', '抱歉 (シ_ _)シ', {
        type: 'warning',
        dangerouslyUseHTMLString: true,
        showClose: false,
        cancelButtonText: '回首页',
        confirmButtonText: '去下载'
      })
        .then(() => {
          router.push({
            path: '/download'
          })
        })
        .catch(() => {
          router.push({
            path: '/'
          })
        })
    }

    onMounted(() => {
      const platform = getSearchParams('platform') || 'wap'
      const linkid = getSearchParams('linkid') || state.linkid || 0
      const recommend = !isNaN(Number(getSearchParams('recommend'))) ? Number(getSearchParams('recommend')) : 0
      const queryToken = getSearchParams('t') || ''
      dispatch('init', { linkid, platform, recommend, queryToken })
    })

    return {
      state
    }
  }
}
</script>

<style lang="scss" src="/@/sass/index.scss"></style>
