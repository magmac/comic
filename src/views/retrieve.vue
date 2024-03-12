<template>
  <Topbar />
  <div class="retrieve">
    <p class="ex">
      请查看您支付宝或微信支付记录中的订单信息，<br />复制
      <b>商户单号（CT*******）</b>，粘贴至下方输入框，並点击立即找回。
    </p>

    <el-form
      ref="formRef"
      :model="state.orderForm"
      :rules="state.rules"
      label-position="left"
      label-width="5rem"
      :status-icon="false"
      :hide-required-asterisk="true"
      class="form"
      @submit.prevent="handleSubmit(formRef)"
    >
      <el-form-item label="商户单号" prop="orderId">
        <el-input v-model="state.orderForm.orderId" placeholder="请输入商户单号" clearable />
      </el-form-item>
      <div class="fixed bottom">
        <el-button type="danger" native-type="submit" class="btn" :loading="state.btnLock"> 立即找回 </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'
import Topbar from '/@/components/blocks/Topbar.vue'
import { regular } from '/@/plugins/validate'

export default {
  name: 'Retrieve',
  components: { Topbar },
  setup() {
    const { dispatch } = useStore()
    const formRef = ref()
    const state = reactive({
      orderForm: {
        orderId: ''
      },
      rules: {
        orderId: [
          {
            required: true,
            message: '请输入商户单号',
            trigger: 'change'
          },
          {
            pattern: regular.order,
            message: regular.orderMsg,
            trigger: 'change'
          }
        ]
      },
      btnLock: false
    })

    const handleSubmit = form => {
      form.validate(valid => {
        if (valid) {
          dispatch('orderToRetrieveUser', state.orderForm)
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
      formRef
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/retrieve.scss"></style>
