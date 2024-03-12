<template>
  <ul class="nav">
    <li v-if="!state.isUserLogin">
      <router-link to="/register">
        <span>
          <i class="el-icon-phone" />
          手机注册
        </span>
        <span><i class="el-icon-arrow-right" /></span>
      </router-link>
    </li>
    <li>
      <router-link to="/deposit">
        <span>
          <i class="el-icon-money" />
          充值中心
        </span>
        <span><i class="el-icon-arrow-right" /></span>
      </router-link>
    </li>
    <li>
      <router-link to="/record">
        <span>
          <i class="el-icon-postcard" />
          消费记录
        </span>
        <span><i class="el-icon-arrow-right" /></span>
      </router-link>
    </li>
    <li v-if="state.isUserLogin">
      <router-link to="/password">
        <span>
          <i class="el-icon-lock" />
          修改密码
        </span>
        <span><i class="el-icon-arrow-right" /></span>
      </router-link>
    </li>
    <li>
      <router-link to="/retrieve">
        <span>
          <i class="el-icon-user" />
          找回用户
        </span>
        <span><i class="el-icon-arrow-right" /></span>
      </router-link>
    </li>
    <li>
      <router-link to="/recommend">
        <span>
          <i class="el-icon-share" />
          分享推广
        </span>
        <span><i class="el-icon-arrow-right" /></span>
      </router-link>
    </li>
    <!-- <li v-if="state.isUserLogin">
      <router-link to="/bonus">
        <span>
          <i class="el-icon-s-order" />
          返利记录
        </span>
        <span><i class="el-icon-arrow-right" /></span>
      </router-link>
    </li> -->
  </ul>
  <el-button v-if="!state.isUserLogin" type="danger" plain class="loginBtn" @click="gotoLogin"> 登录 </el-button>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, computed } from 'vue'

export default {
  setup() {
    const { getters } = useStore()
    const router = useRouter()
    const gotoLogin = () => {
      router.push({
        path: '/login'
      })
    }
    const state = reactive({
      isUserLogin: computed(() => getters.isUserLogin)
    })
    return {
      state,
      gotoLogin
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/member/list.scss"></style>
