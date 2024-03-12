<template>
  <div v-if="state.hasData" v-show="state.show" class="flow">
    <img-load :src="ad.imgurl" @click="adTarget(ad.another, ad.clickurl)" />
    <i class="el-icon-circle-close close" @click="handleClose" />
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { adTarget } from '/@/utils'
import ImgLoad from '/@/components/blocks/ImgLoad.vue'

export default {
  components: {
    ImgLoad
  },
  props: {
    ad: [Object, null]
  },
  setup(props) {
    const state = reactive({
      hasData: computed(() => props.ad),
      show: true
    })
    const handleClose = () => {
      state.show = false
    }

    return {
      state,
      handleClose,
      adTarget
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/blocks/advFlow.scss"></style>
