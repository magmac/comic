<template>
  <PopupMask :width="100" :showClose="false">
    <div class="contentbox">
      <img :src="state.popupInfo.imgSrc" />
      <ul class="togo">
        <li class="close" @click="handleClose">{{ state.popupInfo.closeTitle }}</li>
        <li class="go" @click="handleTogo">{{ state.popupInfo.linkTitle }}</li>
      </ul>
    </div>
  </PopupMask>
</template>
<script>
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { reactive, computed } from 'vue'
import PopupMask from '/@/components/blocks/PopupMask.vue'
import { isIOS } from '/@/utils'
import popupDownload from '/@/assets/popupDownload.png'
import popupRegister from '/@/assets/popupRegister.png'

export default {
  components: {
    PopupMask
  },
  emits: ['close'],
  setup(prop, { emit }) {
    const router = useRouter()
    const route = useRoute()
    const { dispatch, getters } = useStore()
    const state = reactive({
      hasRecharge: computed(() => getters['download/hasRecharge']),
      popupInfo: computed(() =>
        !isIOS()
          ? {
              imgSrc: popupDownload,
              linkTitle: '立即下载',
              closeTitle: '取消'
            }
          : {
              imgSrc: popupRegister,
              linkTitle: '立即注册',
              closeTitle: '取消'
            }
      )
    })

    const handleTogo = () => {
      return !isIOS()
        ? dispatch('download/downloadInfo', state.hasRecharge ? 2 : 1)
        : router.push({
            path: '/register',
            query: {
              from: route.fullPath
            }
          })
    }

    const handleClose = () => {
      emit('close')
    }
    return {
      state,
      handleClose,
      handleTogo
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/read/hintPopup.scss"></style>
