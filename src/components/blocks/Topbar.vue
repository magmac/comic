<template>
  <header>
    <i class="el-icon-arrow-left" @click="gotoBack">
      <div class="backBox">
        <div :class="['title', { title2: !subTitle }]">{{ state.title }}</div>
        <div v-if="subTitle" class="subTitle">{{ subTitle }}</div>
      </div>
    </i>
    <slot />
    <i class="el-icon-s-home" @click="gotoHome" />
  </header>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  props: {
    pageName: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { pageName } = toRefs(props)
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      title: computed(() => pageName.value || route.meta.title)
    })
    const gotoBack = () => {
      router.back()
    }
    const gotoHome = () => {
      const fullPath = route.fullPath
      router.push({
        path: fullPath.includes('video') ? '/video' : '/'
      })
    }
    return {
      state,
      gotoBack,
      gotoHome
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/layout/topbar.scss"></style>
