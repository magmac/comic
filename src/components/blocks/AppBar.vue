<template>
  <div v-if="state.showApp" class="appBar">
    <div class="left">
      <div class="icon"></div>
      <div>
        <p>奈斯漫画</p>
        <p v-if="isIOS">收藏永久连结安心不掉线</p>
        <p v-else>海量未删减高品质漫画抢先看</p>
      </div>
    </div>
    <div class="right">
      <a v-if="isIOS" target="_blank" :href="state.domainPageUrl"> 立即收藏 </a>
      <router-link v-else :to="{ path: '/download' }"> 下载APP </router-link>
      <i class="el-icon-close" @click="closeShowApp" />
    </div>
  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { isIOS } from '/@/utils'

const excludeShowAppPages = ['Download', 'Customer', 'Read', 'NotFound']

export default {
  setup() {
    const { state: storeState } = useStore()
    const route = useRoute()
    const state = reactive({
      switchApp: false,
      platform: computed(() => storeState.auth.platform),
      hasExcludePage: computed(() => !!excludeShowAppPages.find(page => page === route.name)),
      showApp: computed(() => state.switchApp && state.platform !== 'app' && !state.hasExcludePage),
      domainPageUrl: computed(() => storeState.urlListDomain)
    })

    onMounted(() => {
      state.switchApp = true
    })

    const closeShowApp = () => {
      state.switchApp = false
    }

    return {
      state,
      closeShowApp,
      isIOS: isIOS()
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/blocks/appBar.scss"></style>
