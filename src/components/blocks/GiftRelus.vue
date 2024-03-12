<template>
  <img class="title" :src="giftTitleImg" />
  <div class="table">
    <div class="tr">
      <div class="th">等级</div>
      <div class="th">奖励</div>
      <div class="th">【金币】充值金额</div>
    </div>
    <div v-for="(item, index) in levelData" :key="index" class="tr">
      <div class="td">
        <div :class="`level level${item.level}`">
          {{ item.levelName }}
        </div>
      </div>
      <div class="td">
        <div v-for="(bonus, idx) in item.userGiftBonus" :key="idx" class="bonus">
          <span v-if="index === 4 && idx === 2" class="ex">【连续】7 天</span>
          {{ bonus }}
          <span v-if="index === 4 && idx === 2" class="ex">(共 840 金币)</span>
        </div>
      </div>
      <div class="td">
        <div>{{ item.relus }}</div>
      </div>
    </div>
    <div class="warm">
      <p>* 待7日结束后再充值【金币】达100元以上，即可再重覆领取【钻石】等级全部奖励，依此类推。</p>
      <router-link class="btn" :to="{ path: '/register' }"> 加入会员 </router-link>
    </div>
  </div>
</template>
<script>
import giftTitleImg from '/@/assets/giftTitle.png'

const levelData = [
  {
    level: 1,
    levelName: '青铜',
    userGiftBonus: ['1000金币'],
    relus: '累积达 100 元'
  },
  {
    level: 2,
    levelName: '白银',
    userGiftBonus: ['1500金币'],
    relus: '累积达 200 元'
  },
  {
    level: 3,
    levelName: '黄金',
    userGiftBonus: ['2000金币', '视频一日卡'],
    relus: '累积达 300 元'
  },
  {
    level: 4,
    levelName: '铂金',
    userGiftBonus: ['3000金币'],
    relus: '累积达 400 元'
  },
  {
    level: 5,
    levelName: '钻石',
    userGiftBonus: ['5000金币', '视频两日卡', '日领120金币'],
    relus: '累积达 500 元'
  }
]
export default {
  setup() {
    return {
      giftTitleImg,
      levelData
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/blocks/giftRelus.scss"></style>
