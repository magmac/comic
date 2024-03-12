<template>
  <Topbar />
  <div class="download">
    <main>
      <div class="icon"></div>
      <h3>奈斯漫画</h3>
      <button type="button" @click="handleDownload">点击下载安装</button>
    </main>
    <p>奈斯漫画包含成人内容，近日被某些杀毒软件误判为恶意软件， 我们承诺不会放置恶意程序，请放心安装和使用。</p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted, reactive, computed } from 'vue'
import Topbar from '/@/components/blocks/Topbar.vue'
import { ElMessageBox } from 'element-plus'

export default {
  name: 'Download',
  components: { Topbar },
  setup() {
    const router = useRouter()
    const { dispatch, getters } = useStore()
    const state = reactive({
      hasRecharge: computed(() => getters['download/hasRecharge']),
      isUserLogin: computed(() => getters.isUserLogin)
    })

    const handleDownload = () => {
      if (!state.isUserLogin && state.hasRecharge) {
        ElMessageBox.confirm('建议先<b>加入会员</b>，<br/>已保障您的权益', '确认信息', {
          type: 'info',
          dangerouslyUseHTMLString: true,
          cancelButtonText: '继续下载',
          confirmButtonText: '加入会员'
        })
          .then(() => {
            router.push({
              path: '/register',
              query: {
                from: '/download'
              }
            })
          })
          .catch(() => {
            dispatch('download/downloadInfo', state.hasRecharge ? 2 : 1)
          })
      } else {
        dispatch('download/downloadInfo', state.hasRecharge ? 2 : 1)
      }
    }

    onMounted(() => {
      dispatch('fetchUserInfo')
    })

    return {
      state,
      handleDownload
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/download.scss"></style>
