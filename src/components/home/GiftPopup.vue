<template>
  <PopupMask :loading="state.isUserLogin && !Object.keys(state.giftInfo).length" v-bind="$attrs">
    <GiftRelus v-if="!state.isUserLogin" />
    <template v-else>
      <img class="title" :src="giftTitleImg" />
      <div v-loading="state.receiveGiftLoading" element-loading-background="rgba(0, 0, 0, 0)" class="table">
        <div class="tr">
          <div class="th">等级</div>
          <div class="th">奖励</div>
          <div class="th">【金币】充值金额</div>
        </div>
        <div v-for="(item, index) in state.giftInfo.userGiftList" :key="index" class="tr">
          <div class="td">
            <div :class="`level level${item.level}`">
              {{ item.levelName }}
            </div>
            <div v-if="item.level === 5 && state.giftInfo.diamondBonusDayN > 0 && state.giftInfo.diamondBonusDayN <= 7">
              第 {{ state.giftInfo.diamondBonusDayN }} 天
            </div>
          </div>
          <div class="td">
            <div v-for="(bonus, idx) in item.userGiftBonus" :key="idx">
              {{ bonus.rewardName }}
            </div>
          </div>
          <div class="td">
            <div v-if="item.userGiftBonus[0].status === 3">{{ handleBonusText(3) }}</div>
            <div
              v-for="(bonus, idx) in item.userGiftBonus"
              v-else
              :key="idx"
              :class="bonus.status === 0 ? 'get' : ''"
              @click="handleReceive(!!(bonus.status === 0), item.level, bonus.reward)"
            >
              {{ handleBonusText(bonus.status) }}
            </div>
          </div>
        </div>
        <div class="warm">
          <router-link class="btn" :to="{ path: '/deposit' }"> 去充值 </router-link>
          <p v-if="state.giftInfo.moneyTilLevelUp > 0" class="bottomText">
            {{ state.giftInfo.diamondBonusDayN > 7 ? '距离再重覆领取【钻石】等级奖励还差' : '距离达标升等还差' }}
            {{ state.giftInfo.moneyTilLevelUp }} 元
          </p>
        </div>
      </div>
    </template>
  </PopupMask>
</template>
<script>
import { useStore } from 'vuex'
import { reactive, computed, onMounted } from 'vue'
import PopupMask from '/@/components/blocks/PopupMask.vue'
import GiftRelus from '/@/components/blocks/GiftRelus.vue'
import giftTitleImg from '/@/assets/giftTitle.png'

export default {
  components: {
    GiftRelus,
    PopupMask
  },
  inheritAttrs: false,
  setup() {
    const { dispatch, getters, state: storeState } = useStore()
    const { home } = storeState
    const state = reactive({
      isUserLogin: computed(() => getters.isUserLogin),
      giftInfo: computed(() => home.giftInfo),
      receiveGiftLoading: computed(() => home.receiveGiftLoading)
    })

    const handleBonusText = status => {
      switch (status) {
        case 0:
          return '领取'
        case 1:
          return '已领取'
        case 2:
          return '充值再次领取'
        case 3:
          return '未达标'
        default:
          return ''
      }
    }

    const handleReceive = (receiveStatus, level, reward) => {
      if (!receiveStatus) return
      else dispatch('home/receive', { level, reward })
    }

    onMounted(() => {
      if (state.isUserLogin) dispatch('home/getGiftInfo')
    })

    return {
      state,
      giftTitleImg,
      handleBonusText,
      handleReceive
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/home/giftPopup.scss"></style>
