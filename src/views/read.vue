<template>
  <Topbar
    :class="['header', 'fixed', { hide: !state.showTools }]"
    :page-name="state.title"
    :sub-title="state.chaptersName"
  >
    <div class="user">
      <span v-if="state.isVip">vip</span>
      <i v-else class="el-icon-coin">{{ state.beans }}</i>
    </div>
  </Topbar>
  <AdvFlow :ad="state.ad_flow_25" :class="['topadv', 'fixed', { topHide: !state.showTools }]" />
  <HintPopup v-show="state.showHintPopup" @close="toggleHintPopup" />
  <div :class="[{ blur: state.showPayInfo }, 'read']">
    <ul class="images" @click.stop="handleTipScreen">
      <li v-for="(image, index) in state.images" :key="index" :class="state.readMode === 2 ? 'divider' : ''">
        <img-load minHeight="15rem" :src="image" />
      </li>
    </ul>

    <el-backtop v-if="!state.showPayInfo" :right="10" :bottom="80" />
    <div v-if="state.showPayInfo" class="fixed promptBox">
      <div class="text">
        <p>
          本章价格：<span>{{ state.chapterBeans }}</span> 金币
        </p>
        <p>
          您的余额：<span>{{ state.beans }}</span> 金币
        </p>
      </div>
      <router-link to="/deposit">
        <el-button type="danger" class="btn"> 余额不足，立即充值 </el-button>
      </router-link>
      <div class="ex">
        <router-link to="/deposit"> 开通VIP，免费阅读 </router-link>
      </div>
    </div>
    <template v-else>
      <AdvFlow :ad="state.ad_flow_27" :class="['footeradv', 'fixed', { footerHide: !state.showTools }]" />
      <ul :class="['fixed', 'footer', { hide: !state.showTools }]">
        <li class="catalog" @click="gotoDirectory">目录</li>
        <li class="chapter">
          <router-link v-if="state.prevId !== 0" class="text" :to="{ path: `/read/${state.prevId}` }">
            上一章
          </router-link>
          <span v-else class="text none"> 上一章 </span>
          <router-link v-if="state.nextId !== 0" class="text" :to="{ path: `/read/${state.nextId}` }">
            下一章
          </router-link>
          <span v-else class="text none"> 下一章 </span>
        </li>
        <li :class="['fav', { keep: state.hasMyBook }]" @click="handleMyBook">
          {{ state.hasMyBook ? '已收藏' : '收藏' }}
        </li>
      </ul>
    </template>
    <div class="readbar" :style="{ width: `${state.readProgressRate}%` }"></div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, reactive, computed, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toThousands, percentage, isIOS } from '/@/utils'
import Topbar from '/@/components/blocks/Topbar.vue'
import ImgLoad from '/@/components/blocks/ImgLoad.vue'
import AdvFlow from '/@/components/blocks/AdvFlow.vue'
import HintPopup from '/@/components/read/HintPopup.vue'

export default {
  name: 'Read',
  components: { Topbar, ImgLoad, HintPopup, AdvFlow },
  setup() {
    const { dispatch, state: storeState, getters } = useStore()
    const route = useRoute()
    const router = useRouter()
    const { read, userInfo } = storeState
    const state = reactive({
      images: computed(() => getters['read/images']),
      prevId: computed(() => getters['read/prevId']),
      nextId: computed(() => getters['read/nextId']),
      title: computed(() => getters['read/title']),
      bookId: computed(() => getters['read/bookId']),
      ad_flow_25: computed(() => getters['ad_flow_25']),
      ad_flow_27: computed(() => getters['ad_flow_27']),
      showPayInfo: computed(() => read.needPay),
      chaptersName: computed(() => read.chapters.name),
      readMode: computed(() => read.chapters.readmode), // 閱讀樣式 1:預設, 2:切頁, 3:翻書(待開發)
      chapterBeans: computed(() => toThousands(read.chapters.bookBean)),
      beans: computed(() => toThousands(userInfo.bookBean)),
      isVip: computed(() => userInfo.isVip),
      hasMyBook: computed(() => read.hasMyBook),
      showTools: true,
      showHintPopup: false,
      // 提示窗 - 計算/控制出現次數
      hintPopupCount: 0,
      readProgressRate: 0
    })

    watch(
      () => state.chaptersName,
      () => {
        state.hintPopupCount = 0
      }
    )

    watch(
      () => route.path,
      () => {
        if (route.name !== 'Read') document.body.style.overflow = null
        else {
          dispatch('read/fetchChapter', route.params.chapterId)
        }
      }
    )

    // 監聽提示窗狀態，控制背景的滾動
    watch(
      () => state.showHintPopup,
      curr => {
        // 展示提示窗時，阻止背景滾動：隱藏提示窗時，恢復背景的滾動
        document.body.style.overflow = curr ? 'hidden' : null
      }
    )

    const gotoDirectory = () => {
      router.push({
        path: `/directory/${state.bookId}`
      })
    }

    const handleMyBook = () => {
      dispatch('read/toggleMyBook', state.bookId)
    }

    const handleTipScreen = () => {
      if (state.showTools) {
        state.showTools = false
      } else {
        state.showTools = !state.showTools
      }
    }

    const toggleHintPopup = () => {
      state.showHintPopup = !state.showHintPopup
    }

    const handleScroll = () => {
      // 滾動位置
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 可視高度
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      // 總高度
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight

      // 閱讀 % 數
      state.readProgressRate = (scrollTop / (scrollHeight - windowHeight)) * 100

      // tools 顯示判斷
      if (scrollTop < 100) {
        state.showTools = true
      } else if (scrollTop > 100) {
        if (scrollTop + windowHeight + 100 >= scrollHeight) {
          state.showTools = true
        } else {
          state.showTools = false
        }
      }

      // 提示窗 30-60%, 60-95%, 98%+ 顯示，IOS已註冊登入不顯示
      if (state.showHintPopup || scrollTop === 0 || (isIOS && getters.isUserLogin) || state.showPayInfo) return
      const scrollScope = Math.ceil(percentage(scrollTop, scrollHeight - windowHeight))

      if (
        (state.hintPopupCount === 0 && scrollScope > 30 && scrollScope < 60) ||
        (state.hintPopupCount === 1 && scrollScope > 60 && scrollScope < 95) ||
        (state.hintPopupCount === 2 && scrollScope < 98)
      ) {
        state.hintPopupCount++
        state.showHintPopup = true
      }
    }

    onMounted(() => {
      dispatch('read/fetchData', route.params.chapterId)
      window.addEventListener('scroll', handleScroll, true)
    })

    onUnmounted(() => {
      dispatch('read/clearData')
      window.removeEventListener('scroll', handleScroll, true)
    })

    return {
      state,
      gotoDirectory,
      handleMyBook,
      handleTipScreen,
      toggleHintPopup
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/read.scss"></style>
