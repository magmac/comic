<template>
  <el-skeleton :loading="!state.id" animated>
    <template #template>
      <div class="skeleton__top">
        <el-skeleton-item variant="circle" />
        <div class="skeleton__user">
          <el-skeleton-item variant="rect" />
          <el-skeleton-item variant="text" />
        </div>
        <el-skeleton-item variant="h1" />
      </div>
    </template>
    <template #default>
      <div class="top">
        <div class="info">
          <div class="avatar" />
          <div class="userBox">
            <div class="user">
              {{ state.levelName }}
              <span class="id">ID: {{ state.id }}</span>
              <span v-if="state.password" class="password">
                <i class="el-icon-unlock" />
                : {{ state.password }}</span
              >
            </div>
            <div v-if="state.gapToUpgrade !== undefined" class="progress">
              <div class="bar" :style="{ width: `${100 - state.gapToUpgrade}%` }"></div>
            </div>
            <div v-if="state.gapToUpgrade !== undefined" class="gap">
              <div v-if="state.gapToUpgrade > 0" class="upgrade">
                还差 <span>{{ state.gapToUpgrade }}</span> 元{{
                  state.level === 5 ? '可再领取【钻石】等级奖励' : '升级'
                }}
              </div>
              <router-link v-if="state.showDepositBtn" class="topay" to="/deposit"> 去充值 </router-link>
            </div>
          </div>
        </div>
        <div class="welfare">
          <div class="item">
            <i class="el-icon-coin icon" />
            <div class="instruction">金币</div>
            <div class="value">
              <span>{{ state.beans }}</span>
            </div>
          </div>
          <div v-if="state.vipCartoonDate" class="item">
            <i class="el-icon-medal icon" />
            <div class="instruction">漫画 VIP</div>
            <div class="value">
              <i class="el-icon-date" />
              <span>{{ state.vipCartoonDate }}</span>
            </div>
          </div>
          <div v-if="state.vipVideoDate" class="item">
            <i class="el-icon-trophy icon" />
            <div class="instruction">视频 VIP</div>
            <div class="value">
              <i class="el-icon-date" />
              <span>{{ state.vipVideoDate }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script>
import { useRoute } from 'vue-router'
import { format } from 'date-fns'
import { useStore } from 'vuex'
import { computed, reactive, onMounted } from 'vue'
import { toThousands } from '/@/utils'

export default {
  setup() {
    const { state: storeState, dispatch } = useStore()
    const { userInfo } = storeState
    const route = useRoute()
    const state = reactive({
      id: computed(() => (userInfo.uid ? userInfo.uid : userInfo.id)),
      level: computed(() => userInfo.level || 0),
      levelName: computed(() => userInfo.levelName || '遊客'),
      password: computed(() => userInfo.password),
      beans: computed(() => toThousands(userInfo.bookBean)),
      gapToUpgrade: computed(() => userInfo.moneyTilLevelUp),
      position: computed(() => (userInfo.isVip === 1 ? '会员' : '未开通')),
      vipCartoonDate: computed(() => (!userInfo.isVip ? '' : format(userInfo.vipEndtime, 'yyyy-MM-dd'))),
      vipVideoDate: computed(() => (!userInfo.discountType ? '' : format(userInfo.discountEndtime, 'yyyy-MM-dd'))),
      showDepositBtn: computed(() => route.name !== 'Deposit')
    })

    onMounted(() => {
      dispatch('fetchUserInfo')
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/layout/userInfo.scss"></style>
