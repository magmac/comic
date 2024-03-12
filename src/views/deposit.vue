<template>
  <Topbar />
  <user-info />
  <img :src="depositImg01" />
  <div class="deposit">
    <template v-if="state.normal.length">
      <div class="title" @click="handleTestClick">
        <i class="el-icon-coin" />
        金币充值
      </div>
      <ul class="normal">
        <li
          v-for="item in state.normal"
          :key="item.id"
          v-loading.fullscreen.lock="state.isLoading"
          element-loading-background="rgba(0, 0, 0, .2)"
          @click="getPayList(item.id)"
        >
          <div v-if="JSON.parse(item.tag).label" class="tag">
            {{ JSON.parse(item.tag).label }}
          </div>
          <div class="dollar">
            <b>{{ toThousands(item.price) }}</b> 元
          </div>
          <div class="virtual">
            <span>{{ toThousands(item.realBean) }}</span>
            <span v-if="item.giveBean">+{{ toThousands(item.giveBean) }}</span>
            <em> 金币</em>
          </div>
          <div class="ex">
            <strong v-if="item.givePrice"
              >多送<b>{{ toThousands(item.givePrice) }}</b
              >元</strong
            >
            <span v-if="item.isHot" class="hot">热销</span>
            <span v-if="item.isPromote" class="promote">推荐</span>
          </div>
        </li>
      </ul>
    </template>
    <template v-if="state.day.length && !isIOS()">
      <div class="title">
        <i class="el-icon-postcard" />
        视频日卡
      </div>
      <ul class="day">
        <li v-for="item in state.day" :key="item.id" @click="checkPopup(item.id)">
          <div v-if="JSON.parse(item.tag).label" class="tag">
            {{ JSON.parse(item.tag).label }}
          </div>
          <div class="dollar">
            <b>{{ toThousands(item.price) }}</b> 元
          </div>
          <div class="description">
            <span>原价 <s>50</s> 元，</span>
            <span v-if="item.giveBean">+{{ toThousands(item.giveBean) }}</span>
            <span>超值优惠价 </span>
            <b>{{ toThousands(item.price) }}</b> 元
          </div>
          <div class="ex">
            <strong>全站视频爽看一整天</strong>
            <span v-if="item.isHot" class="hot">热销</span>
            <span v-if="item.isPromote" class="promote">推荐</span>
          </div>
        </li>
      </ul>
    </template>
    <template v-if="state.vip.length">
      <div class="title">
        <i class="el-icon-medal" />
        VIP充值
      </div>
      <ul>
        <li v-for="item in state.vip" :key="item.id" @click="getPayList(item.id)">
          <div v-if="JSON.parse(item.tag).label" class="tag">
            {{ JSON.parse(item.tag).label }}
          </div>
          <div class="dollar">
            <b>{{ toThousands(item.price) }}</b> 元
          </div>
          <div class="subscription">
            <b v-if="item.isVip === 2">VIP季卡</b>
            <b v-if="item.isVip === 3">VIP年卡</b>
          </div>
          <div class="vipDay">
            <b>{{ item.vipDay }}</b>
            <span> 天免费看</span>
          </div>
        </li>
      </ul>
    </template>
    <img class="activityBanner" :src="depositImg02" @click="toggleGiftRelusPopup" />
    <router-link class="service" to="/customer"> 充值不到账？点击这里联系客服 </router-link>
    <p class="hint">1. 有问题请直接联系客服处理</p>
    <p class="hint">2. 如果充值不到账请提供支付成功截图给客服</p>
    <p class="hint">3. <router-link to="/customer"> 有问题？点击这里联系客服 </router-link></p>
    <p class="hint">
      4. 最新客服联系方式在永久网址查看:
      <a target="_blank" :href="state.domainPageUrl">{{ state.domainPageUrl }}</a>
    </p>
    <p class="hint ps">PS：充值购买为虚拟产品，升级成功后不支持退款！</p>
    <div class="remind">温馨提示：VIP用户可免费阅读所有VIP作品！<br />欢迎您使用支付宝 / 微信储值金币或开通VIP。</div>
  </div>
  <PayDialog :price-id="state.priceId" :show="state.showPayDialog" :pay-list="state.payList" @close="closeDialog" />
  <GiftRelusPopup v-if="state.showGiftRelus" @close="toggleGiftRelusPopup" />
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, reactive, computed, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { toThousands, isIOS } from '/@/utils'
import Topbar from '/@/components/blocks/Topbar.vue'
import UserInfo from '/@/components/blocks/UserInfo.vue'
import PayDialog from '/@/components/deposit/PayDialog.vue'
import GiftRelusPopup from '/@/components/deposit/GiftRelusPopup.vue'
import { getPayList as apiGetPayList, getPayListTest as apiGetTestPayList } from '/@/api'
import depositImg01 from '/@/assets/deposit01.png'
import depositImg02 from '/@/assets/deposit02.png'

export default {
  name: 'Deposit',
  components: { Topbar, UserInfo, PayDialog, GiftRelusPopup },
  setup() {
    const { dispatch, getters, state: storeState } = useStore()
    const state = reactive({
      domainPageUrl: computed(() => storeState.urlListDomain),
      normal: computed(() => getters['deposit/normal']),
      vip: computed(() => getters['deposit/vip']),
      day: computed(() => getters['deposit/day']),
      showPayDialog: false,
      showGiftRelus: false,
      isLoading: false,
      payList: [],
      priceId: 0,
      testClickCount: 0
    })

    watch(
      () => state.testClickCount,
      curr => {
        if (curr === 10) {
          dispatch('deposit/getPayMenuTest')
          ElMessage({
            message: '测试支付模式开启',
            type: 'warning'
          })
        }
      }
    )

    const checkPopup = id => {
      ElMessageBox({
        type: 'info',
        message: '视频日卡用于观看视频内容，无法看漫画内容',
        callback: () => {
          getPayList(id)
        }
      })
    }

    async function getPayList(id) {
      state.priceId = id
      state.isLoading = true
      let data = []
      if (state.testClickCount < 10) data = await apiGetPayList({ price_id: id })
      else {
        const res = await Promise.all([apiGetPayList({ price_id: id }), apiGetTestPayList({ price_id: id })])
        if (res[1]) {
          res[1].forEach(item => {
            Object.assign(item, { test: true })
          })
        }
        data = res[0].concat(res[1])
      }
      state.isLoading = false

      if (data.length) {
        state.showPayDialog = true
        state.payList = data
      } else {
        ElMessage({
          message: '目前没有可用支付',
          type: 'warning'
        })
      }
    }

    const handleTestClick = () => {
      if (state.testClickCount > 10) return
      state.testClickCount++
    }

    const toggleGiftRelusPopup = () => {
      state.showGiftRelus = !state.showGiftRelus
    }

    const closeDialog = () => {
      state.showPayDialog = false
    }

    onMounted(() => {
      dispatch('deposit/fetchData')
    })

    return {
      state,
      toThousands,
      getPayList,
      closeDialog,
      toggleGiftRelusPopup,
      handleTestClick,
      depositImg01,
      depositImg02,
      isIOS,
      checkPopup
    }
  }
}
</script>

<style lang="scss">
body.el-popup-parent--hidden {
  padding-right: 0 !important;
}
</style>

<style scoped lang="scss" src="/@/sass/deposit/index.scss"></style>
