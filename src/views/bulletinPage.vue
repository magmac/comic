<template>
  <Topbar :page-name="state.detail.title" />
  <el-skeleton :loading="!Object.keys(state.detail).length" animated>
    <template #template>
      <div class="item">
        <el-skeleton-item variant="image" />
      </div>
    </template>
    <template #default>
      <div class="imageContent">
        <img-load minHeight="20rem" :src="state.detail.contentImagePath" />
      </div>
    </template>
  </el-skeleton>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, reactive, computed, onUnmounted } from 'vue'
import Topbar from '/@/components/blocks/Topbar.vue'
import ImgLoad from '/@/components/blocks/ImgLoad.vue'

export default {
  name: 'BulletinPage',
  components: { Topbar, ImgLoad },
  setup() {
    const { state: storeState, dispatch } = useStore()
    const { bulletin } = storeState
    const state = reactive({
      detail: computed(() => bulletin.detail)
    })

    onMounted(() => {
      dispatch('bulletin/fetchBulletin')
    })

    onUnmounted(() => {
      dispatch('bulletin/clearData')
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/bulletinPage.scss"></style>
