<template>
  <Topbar />
  <img :src="registerBgImg" alt="奈斯漫画" />
  <div class="box">
    <el-form
      ref="formRef"
      :model="state.registerForm"
      :rules="state.rules"
      label-position="left"
      label-width="5rem"
      :status-icon="false"
      :hide-required-asterisk="true"
      @submit.prevent="handleSubmit(formRef)"
    >
      <div class="inputbox">
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="state.registerForm.phone" :maxlength="11" placeholder="请输入手机号码" clearable />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="state.registerForm.password" :maxlength="18" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input
            v-model="state.registerForm.checkPassword"
            :maxlength="18"
            placeholder="请再次输入密码"
            show-password
          />
        </el-form-item>
      </div>
      <div class="bottom">
        <el-button type="danger" native-type="submit" class="btn" :loading="state.btnLock">
          立即注册，新用户赠送150金币
        </el-button>
        <router-link to="/login" class="link"> 已有账号，去登录 </router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'
import Topbar from '/@/components/blocks/Topbar.vue'
import { regular } from '/@/plugins/validate'
import registerBgImg from '/@/assets/registerBg.jpg'

export default {
  name: 'Register',
  components: { Topbar },
  setup() {
    const { dispatch } = useStore()
    const formRef = ref()
    const state = reactive({
      registerForm: {
        phone: '',
        password: '',
        checkPassword: ''
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
          },
          {
            validator: (rule, value, callback) => {
              if (state.registerForm.checkPassword) formRef.value.validateField('checkPassword')
              callback()
            },
            trigger: 'change'
          }
        ],
        checkPassword: [
          {
            required: true,
            message: '请输入确认密码',
            trigger: 'change'
          },
          {
            validator: (rule, value, callback) => {
              if (value !== state.registerForm.password) callback(new Error('确认密码与密码不一致'))
              else callback()
            },
            trigger: 'change'
          }
        ]
      },
      btnLock: false
    })
    const handleSubmit = form => {
      form.validate(valid => {
        if (valid) {
          const {
            registerForm: { phone, password }
          } = state
          const params = { phone, password }
          dispatch('register', params)
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
      registerBgImg
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/register.scss"></style>
