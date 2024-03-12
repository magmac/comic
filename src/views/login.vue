<template>
  <Topbar />
  <img :src="loginBgImg" alt="奈斯漫画" />
  <div class="box">
    <el-form
      ref="formRef"
      :model="state.loginForm"
      :rules="state.rules"
      label-position="left"
      label-width="5rem"
      :status-icon="false"
      :hide-required-asterisk="true"
      @submit.prevent="handleSubmit(formRef)"
    >
      <div class="inputbox">
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="state.loginForm.phone" :maxlength="11" placeholder="请输入手机号码" clearable />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="state.loginForm.password" :maxlength="18" placeholder="请输入密码" show-password />
        </el-form-item>
      </div>
      <div class="bottom">
        <el-button type="danger" native-type="submit" class="btn" :loading="state.btnLock"> 登录 </el-button>
        <router-link to="/register" class="link"> 没有账号，去注册 </router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'
import Topbar from '/@/components/blocks/Topbar.vue'
import { regular } from '/@/plugins/validate'
import loginBgImg from '/@/assets/loginBg.png'

export default {
  name: 'Login',
  components: { Topbar },
  setup() {
    const { dispatch } = useStore()
    const formRef = ref()
    const state = reactive({
      loginForm: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'change'
          },
          {
            pattern: regular.telephone,
            message: regular.telephoneMsg,
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'change'
          },
          {
            min: 6,
            message: '密码的长度应大於6位',
            trigger: 'change'
          }
        ]
      },
      btnLock: false
    })
    const handleSubmit = form => {
      form.validate(valid => {
        if (valid) {
          dispatch('userSignin', state.loginForm)
          state.btnLock = true
          setTimeout(() => {
            state.btnLock = false
          }, 1000)
        } else {
          return false
        }
      })
    }
    return {
      state,
      handleSubmit,
      formRef,
      loginBgImg
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/login.scss"></style>
