<template>
  <PopupMask :loading="state.loading" v-bind="$attrs">
    <div class="shareBox">
      <div class="box">
        <div class="name">{{ name }}</div>
        <div class="img">
          <img-video-load :src="imagePath" :playIcon="false" />
        </div>
        <!-- <div class="url">
          {{ state.shareUrl }}
        </div> -->
        <h3>分享方式</h3>
        <div class="share">
          <div class="li">
            <div class="description">1. 長按下载二维码</div>
            <div class="qr">
              <vue-qr
                :text="state.qrcodeOptions.url"
                :margin="state.qrcodeOptions.margin"
                :size="state.qrcodeOptions.size"
                :logoSrc="state.qrcodeOptions.logoSrc"
              ></vue-qr>
            </div>
          </div>
          <div class="li">
            <div class="description">2. 点选复制分享链接</div>
            <el-button class="button" type="danger" icon="el-icon-document-copy" @click="handleClipboard"
              >复制</el-button
            >
          </div>
        </div>
        <div class="ex">如微信等APP扫码无法打开，请用浏览器访问</div>
      </div>
    </div>
  </PopupMask>
</template>
<script>
import { useStore } from 'vuex'
import { reactive, computed, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import PopupMask from '/@/components/blocks/PopupMask.vue'
import ImgVideoLoad from '/@/components/blocks/ImgVideoLoad.vue'
import VueQr from 'vue-qr/src/packages/vue-qr.vue'
import { toClipboard } from '@soerenmartius/vue3-clipboard'
import appIcon from '/@/assets/appIcon.png'

export default {
  components: {
    PopupMask,
    ImgVideoLoad,
    VueQr
  },
  inheritAttrs: false,
  props: {
    id: {
      type: Number,
      required: true
    },
    imagePath: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(prop) {
    const { dispatch, state: storeState } = useStore()
    const { video } = storeState
    const state = reactive({
      loading: true,
      videoLinkid: computed(() => video.videoLinkid),
      shareUrl: computed(() => `${storeState.domain}/video/player/${prop.id}?linkid=${state.videoLinkid}`),
      qrcodeOptions: {
        url: computed(() => state.shareUrl),
        size: 100,
        margin: 0,
        logoSrc: appIcon
      }
    })

    watch(
      () => state.videoLinkid,
      () => {
        state.loading = false
      }
    )

    const handleQrcode = url => {
      state.downloadQrcodeUrl = url
    }

    const handleClipboard = () => {
      toClipboard(state.shareUrl)
        .then(() => {
          ElMessage({
            message: '复制分享链接成功',
            type: 'success'
          })
        })
        .catch(() => {
          console.error('Clipboard Error!!')
        })
    }

    onMounted(() => {
      if (!state.videoLinkid) return dispatch('video/fetchVideoLinkid')
      state.loading = false
    })

    return {
      state,
      handleQrcode,
      handleClipboard
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/blocks/sharePopup.scss"></style>
