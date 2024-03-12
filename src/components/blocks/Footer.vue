<template>
  <div class="raise" />
  <footer class="fixed">
    <ul>
      <li>
        <router-link to="/">
          <i class="icon el-icon-reading" />
          漫画
        </router-link>
      </li>
      <li>
        <router-link to="/bookshelf/history">
          <i class="icon el-icon-document" />
          阅读记录
        </router-link>
      </li>
      <li v-if="!isIOS">
        <router-link to="/video">
          <i class="icon el-icon-video-camera" />
          视频
        </router-link>
      </li>
      <li>
        <router-link to="/member">
          <i class="icon el-icon-user-solid" />
          个人中心
        </router-link>
      </li>
      <li>
        <router-link to="/customer">
          <i class="icon el-icon-headset" />
          客服
        </router-link>
      </li>
    </ul>
  </footer>
</template>

<script>
import { isIOS } from '/@/utils'

export default {
  setup() {
    return {
      isIOS: isIOS()
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/layout/footer.scss"></style>
