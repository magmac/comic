<template>
  <ul>
    <li>
      <router-link class="more" :to="{ path: '/video/ranking/25' }">
        <i class="icon data el-icon-s-data" />
        榜单
      </router-link>
    </li>
    <li>
      <router-link to="/video/tag/1">
        <i class="icon goods el-icon-s-goods" />
        分类
      </router-link>
    </li>
    <li>
      <router-link to="/deposit">
        <i class="icon coin el-icon-coin" />
        充值
      </router-link>
    </li>
    <li>
      <router-link to="/video/myVideo/favorite">
        <i class="icon video el-icon-video-camera-solid" />
        收藏
      </router-link>
    </li>
    <li>
      <router-link to="/bulletin">
        <i class="icon chat el-icon-chat-dot-round" />
        公告
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  setup() {}
}
</script>

<style scoped lang="scss" src="/@/sass/video/index/menu.scss"></style>
