<template>
  <Topbar />
  <div class="box">
    <el-form
      ref="formRef"
      :model="state.passwordForm"
      :rules="state.rules"
      label-position="left"
      label-width="5rem"
      :status-icon="false"
      :hide-required-asterisk="true"
      @submit.prevent="handleSubmit(formRef)"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="state.passwordForm.oldPassword" placeholder="请输入旧密码" show-password />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="state.passwordForm.password" :maxlength="18" placeholder="请输入新密码" show-password />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input
          v-model="state.passwordForm.checkPassword"
          :maxlength="18"
          placeholder="请再次输入密码"
          show-password
        />
      </el-form-item>
      <div class="fixed bottom">
        <el-button type="danger" native-type="submit" class="btn" :loading="state.btnLock"> 确认修改 </el-button>
        <span class="link"> 旧密码查询，请洽<router-link to="/customer">客服</router-link> </span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, computed, reactive, ref } from 'vue'
import Topbar from '/@/components/blocks/Topbar.vue'

export default {
  name: 'Password',
  components: { Topbar },
  setup() {
    const { dispatch, state: storeState } = useStore()
    const { userInfo } = storeState
    const formRef = ref()
    const state = reactive({
      passwordForm: {
        oldPassword: '',
        password: '',
        checkPassword: ''
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: '请输入旧密码',
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'change'
          },
          {
            min: 6,
            message: '新密码的长度应大於6位',
            trigger: 'change'
          },
          {
            validator: (rule, value, callback) => {
              if (value === state.passwordForm.oldPassword) callback(new Error('新密码与旧密码不能一致'))
              else callback()
            },
            trigger: 'change'
          },
          {
            validator: (rule, value, callback) => {
              if (state.passwordForm.checkPassword) formRef.value.validateField('checkPassword')
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
              if (value !== state.passwordForm.password) callback(new Error('确认密码与新密码不一致'))
              else callback()
            },
            trigger: 'change'
          }
        ]
      },
      btnLock: false,
      phone: computed(() => userInfo.phone)
    })

    const handleSubmit = form => {
      form.validate(valid => {
        if (valid) {
          const {
            passwordForm: { oldPassword, password }
          } = state
          dispatch('changePassword', { phone: state.phone, passwordOrig: oldPassword, password })
          state.btnLock = true
          setTimeout(() => {
            state.btnLock = false
          }, 1000)
        } else {
          return false
        }
      })
    }

    onMounted(() => {
      dispatch('fetchUserInfo')
    })

    return {
      state,
      handleSubmit,
      formRef
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/password.scss"></style>
