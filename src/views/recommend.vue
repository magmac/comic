<template>
  <Topbar />
  <div class="recommend">
    <div class="shareImg">
      <div class="inputBox">
        <template v-if="!state.parentUid">
          <el-input v-model="state.recommendId" maxlength="8" class="input" placeholder="请输入ID分享码"></el-input>
          <el-button class="button" type="danger" @click="handleSure">确 定</el-button>
        </template>
        <p v-else>
          推广返利給 <br /><b>{{ state.parentUid }}</b>
        </p>
      </div>
    </div>
    <div v-if="state.shareUrl" class="box">
      <h1><span>邀请好友</span> 分享方式</h1>
      <h3>方法一：请好友输入“我的分享码”</h3>
      <div class="mycode">
        我的分享码: <b>{{ state.uid }}</b>
      </div>
      <h3>方法二：下载並分享我的二维码</h3>
      <div class="mycode mycodeImg">
        <vue-qr
          :margin="state.qrcodeOptions.margin"
          :text="state.qrcodeOptions.url"
          :size="state.qrcodeOptions.size"
          :logoSrc="state.qrcodeOptions.logoSrc"
          :logoMargin="state.qrcodeOptions.logoMargin"
          :logoScale="state.qrcodeOptions.logoScale"
          :callback="handleQrcode"
        ></vue-qr>
        <a :href="state.downloadQrcodeUrl" download>下载我的二维码</a>
      </div>
      <h3>方法三：点选复制我的分享链接</h3>
      <div class="mycode">
        <el-button class="button" type="danger" icon="el-icon-document-copy" @click="handleClipboard">复制</el-button>
      </div>
    </div>
    <div class="ex">详情可见<router-link to="/bulletin/108"> 公告活动 </router-link></div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Topbar from '/@/components/blocks/Topbar.vue'
import VueQr from 'vue-qr/src/packages/vue-qr.vue'
import { toClipboard } from '@soerenmartius/vue3-clipboard'
import appIcon from '/@/assets/appIcon.png'

export default {
  name: 'Recommend',
  components: { Topbar, VueQr },
  setup() {
    const { dispatch, state: storeState } = useStore()
    const { recommend } = storeState
    const state = reactive({
      recommendId: null,
      uid: computed(() => recommend.info.uid),
      shareUrl: computed(() => recommend.info.shareUrl),
      parentUid: computed(() => recommend.info.parentUid),
      qrcodeOptions: {
        url: computed(() => recommend.info.shareUrl),
        size: 150,
        margin: 0,
        logoSrc: appIcon
      },
      downloadQrcodeUrl: ''
    })

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

    const handleSure = () => {
      ElMessageBox.confirm(`确定要设置分享返利给ID:<b> ${state.recommendId} </b>`, '设定后无将法变更', {
        type: 'info',
        dangerouslyUseHTMLString: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定'
      }).then(() => {
        dispatch('recommend/addRecommendId', state.recommendId)
      })
    }

    onMounted(() => {
      dispatch('recommend/recommendInfo')
    })

    return {
      state,
      handleClipboard,
      handleQrcode,
      handleSure
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/recommend.scss"></style>
