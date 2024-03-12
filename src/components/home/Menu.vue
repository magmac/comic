<template>
  <ul>
    <li>
      <router-link class="more" :to="{ path: '/more/10' }">
        <i class="icon data el-icon-s-data" />
        榜单
      </router-link>
    </li>
    <li>
      <router-link to="/category">
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
      <router-link :to="isIOS ? '/bookshelf/favorite' : '/video'">
        <i class="icon video el-icon-video-camera-solid" />
        {{ isIOS ? '收藏' : '视频' }}
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
import { isIOS } from '/@/utils'

export default {
  setup() {
    return {
      isIOS: isIOS()
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/home/menu.scss"></style>
