<template>
  <PopupMask :showClose="false">
    <div class="trunk">
      <div class="content">
        <p>
          系统全面升级，即将在 {{ state.countdownSec }} 秒后导向新地址<br />
          为保障您的权益，请重新保存新地址
        </p>
        <button @click="handleRedirect">立即跳转</button>
      </div>
    </div>
  </PopupMask>
</template>
<script>
import { reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import PopupMask from '/@/components/blocks/PopupMask.vue'

export default {
  components: {
    PopupMask
  },
  setup() {
    const { state: storeState } = useStore()
    const state = reactive({
      countdownSec: 5,
      linkid: computed(() => storeState.auth.linkid),
      token: computed(() => storeState.auth.token),
      redirectUrl: computed(() => storeState.redirectUrl)
    })

    const handleRedirect = () => {
      window.location.replace(`${state.redirectUrl}?t=${state.token}&linkid=${state.linkid}`)
    }

    onMounted(() => {
      setInterval(() => {
        if (state.countdownSec === 1) return handleRedirect()
        state.countdownSec--
      }, 1000)
    })

    return {
      state,
      handleRedirect
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/blocks/redirectPopup.scss"></style>
