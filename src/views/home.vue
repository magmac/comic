<template>
  <BulletinPopup v-if="state.showBulletinPopup" />
  <GiftPopup v-if="state.showGiftPopup" @close="toggleGiftPopup" />
  <!-- <RedirectPopup v-if="state.showRedirectPopup" /> -->
  <HomeHeader />
  <Banner :ad="state.ad_banner_7" />
  <MenuNav />
  <div class="books">
    <Heading :title="state.essence.title" :path="{ path: `/more/${state.essence.choiceId}` }" />
    <ColumnsBooks
      :books="state.essence.books"
      :choice-id="state.essence.choiceId"
      :loading="!state.essence.books.length"
      :ad="state.ad_book_22"
    />
  </div>
  <AdvFlow :ad="state.ad_flow_18" />
  <div class="books">
    <Heading :title="state.news.title" :path="{ path: `/more/${state.news.choiceId}` }" />
    <ColumnsBooks
      :books="state.news.books"
      :choice-id="state.news.choiceId"
      :loading="!state.news.books.length"
      :ad="state.ad_book_23"
    />
  </div>
  <div class="books">
    <Heading :title="state.popular.title" :path="{ path: `/more/${state.popular.choiceId}` }" />
    <ColumnsBooks
      :books="state.popular.books"
      :loading="!state.popular.books.length"
      :choice-id="state.popular.choiceId"
    />
  </div>
  <div class="books">
    <Heading :title="state.likes.title" :path="{ path: `/more/${state.likes.choiceId}` }" />
    <FullBooks
      :books="state.likes.books"
      :loading="!state.likes.books.length"
      :choice-id="state.likes.choiceId"
      :ad="state.ad_book_84"
    />
  </div>
  <AdvFlow :ad="state.ad_flow_20" class="fixed footeradv" />
  <MenuFooter />
  <div class="gift">
    <img :src="giftImg" @click="toggleGiftPopup" />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, reactive, computed } from 'vue'
import HomeHeader from '/@/components/home/Header.vue'
import Banner from '/@/components/home/Banner.vue'
import MenuNav from '/@/components/home/Menu.vue'
import BulletinPopup from '/@/components/home/BulletinPopup.vue'
import GiftPopup from '/@/components/home/GiftPopup.vue'
import AdvFlow from '/@/components/blocks/AdvFlow.vue'
import MenuFooter from '/@/components/blocks/Footer.vue'
import FullBooks from '/@/components/blocks/FullBooks.vue'
import ColumnsBooks from '/@/components/blocks/ColumnsBooks.vue'
import Heading from '/@/components/blocks/Heading.vue'
// import RedirectPopup from '/@/components/blocks/redirectPopup.vue'
import giftImg from '/@/assets/gift.png'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    Banner,
    MenuNav,
    ColumnsBooks,
    FullBooks,
    MenuFooter,
    Heading,
    BulletinPopup,
    GiftPopup,
    AdvFlow
    // RedirectPopup
  },
  setup() {
    const { state: storeState, dispatch, getters } = useStore()
    const state = reactive({
      hasCartoons: computed(() => getters['home/hasCartoons']),
      essence: computed(() => getters['home/essence']),
      news: computed(() => getters['home/news']),
      popular: computed(() => getters['home/popular']),
      likes: computed(() => getters['home/likes']),
      ad_banner_7: computed(() => getters['ad_banner_7']),
      ad_book_22: computed(() => getters['ad_book_22']),
      ad_book_23: computed(() => getters['ad_book_23']),
      ad_book_84: computed(() => getters['ad_book_84']),
      ad_flow_18: computed(() => getters['ad_flow_18']),
      ad_flow_20: computed(() => getters['ad_flow_20']),
      showBulletinPopup: computed(() => getters['home/showBulletinPopup']),
      showGiftPopup: false
      // showRedirectPopup: computed(() => !!storeState.redirectUrl)
    })

    const toggleGiftPopup = () => {
      state.showGiftPopup = !state.showGiftPopup
    }

    onMounted(() => {
      if (!state.hasCartoons) dispatch('home/fetchCartoons')
      if (state.showBulletinPopup) dispatch('home/getBulletinPopup')
    })

    return {
      state,
      giftImg,
      toggleGiftPopup
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/home/index.scss"></style>
