<template>
  <el-dialog
    :before-close="handleClose"
    :model-value="show"
    title="请选择您的支付方式"
    width="80%"
    destroy-on-close
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="true"
  >
    <ul>
      <li
        v-for="item in state.paymentTypes"
        :key="item.id"
        v-loading.fullscreen.lock="state.loading"
        element-loading-background="rgba(0, 0, 0, .2)"
        @click="handlePayment(item.id)"
      >
        <img :src="item.imgIcon" :alt="item.name" />
        <div class="name">{{ item.name }}</div>
      </li>
    </ul>
    <p>
      <i class="el-icon-message-solid" />
      温馨提示：请按照支付通道指定金额付款(包括小数点)，如没有及时到帐请联系客服。软件已经官方授权，保护支付环境，保障财产安全，请放心使用
    </p>
  </el-dialog>
</template>

<script>
import { toRefs, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import weixinImg from '/@/assets/weixin.png'
import alipayImg from '/@/assets/alipay.png'
import defaultImg from '/@/assets/pay.png'
import { payment } from '/@/api'

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    priceId: {
      type: Number,
      required: true
    },
    payList: {
      type: Array,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const { payList, priceId } = toRefs(props)
    const route = useRoute()
    const state = reactive({
      paymentTypes: computed(() => {
        const pays = []
        payList.value.forEach(item => {
          if (item.sdk.indexOf('Weixin') > -1) {
            Object.assign(item, { imgIcon: weixinImg, name: !item.test ? '微信支付' : `${item.id}` })
          } else if (item.sdk.indexOf('Alipay') > -1) {
            Object.assign(item, { imgIcon: alipayImg, name: !item.test ? '支付宝' : `${item.id}` })
          } else if (item.sdk.indexOf('Ysfpay') > -1) {
            Object.assign(item, { imgIcon: weixinImg, name: !item.test ? '云闪付' : `${item.id}` })
          } else {
            Object.assign(item, { imgIcon: defaultImg, name: !item.test ? '支付' : `${item.id}` })
          }
          pays.push(item)
        })
        return pays
      }),
      loading: false
    })
    const handleClose = () => {
      emit('close')
    }
    async function handlePayment(paymentId) {
      state.loading = true
      const { vid } = route.query
      const params = { priceId: priceId.value, app: 1, paymentId }
      if (vid) Object.assign(params, { vid })
      const res = await payment(params)
      state.loading = false
      if (!res.payurl) {
        ElMessage({
          message: res,
          type: 'warning'
        })
        return
      }
      window.location.href = decodeURI(res.payurl)
    }
    return {
      state,
      handleClose,
      weixinImg,
      alipayImg,
      handlePayment
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/deposit/payDialog.scss"></style>
