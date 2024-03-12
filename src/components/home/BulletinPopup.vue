<template>
  <PopupMask :width="70" :loading="state.loading" @close="handleClose">
    <img class="img" :src="state.imgSrc" :onload="handleLoad" @click="handleClickImg" />
  </PopupMask>
</template>
<script>
import { useStore } from 'vuex'
import { reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import PopupMask from '/@/components/blocks/PopupMask.vue'
import { getImageToBase64 } from '/@/utils'

export default {
  components: {
    PopupMask
  },
  setup() {
    const { dispatch, getters } = useStore()
    const router = useRouter()
    const state = reactive({
      bulletin: computed(() => getters['home/bulletin']),
      loading: true,
      imgSrc: null
    })

    watch(
      () => state.bulletin.imagePath,
      () => {
        getImgBase64()
      }
    )

    const getImgBase64 = () => {
      if (!state.bulletin.imagePath) return
      getImageToBase64(state.bulletin.imagePath).then(res => {
        state.imgSrc = res
      })
    }

    const handleLoad = () => {
      state.loading = false
    }

    const handleClickImg = () => {
      const { path } = state.bulletin
      if (!path) return
      dispatch('home/updateBulletinDate')
      router.push({
        path
      })
    }

    const handleClose = () => {
      dispatch('home/updateBulletinDate')
    }

    onMounted(() => {
      getImgBase64()
    })

    return {
      state,
      handleLoad,
      handleClickImg,
      handleClose
    }
  }
}
</script>
