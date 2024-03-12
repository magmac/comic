<template>
  <el-skeleton :loading="!state.banner.books.length" animated>
    <template #template>
      <el-skeleton-item variant="image" />
    </template>
    <template #default>
      <swiper
        :modules="modules"
        :loop="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        navigation
        :pagination="{ clickable: true }"
      >
        <swiper-slide>
          <img :src="bannerImg" @click="handleActivity" />
        </swiper-slide>
        <swiper-slide v-for="book in state.banner.books" :key="book.id">
          <img-load :src="book.horizontal" fit="fill" @click="handleRedirect(book.id)" />
        </swiper-slide>
        <swiper-slide v-if="ad">
          <img-load :src="ad.imgurl" fit="fill" @click="adTarget(ad.another, ad.clickurl)" />
        </swiper-slide>
      </swiper>
    </template>
  </el-skeleton>
</template>

<script>
import { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { reactive, computed } from 'vue'
import { adTarget } from '/@/utils'
import ImgLoad from '/@/components/blocks/ImgLoad.vue'
import bannerImg from '/@/assets/banner_deposit.jpg'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

export default {
  components: {
    ImgLoad,
    Swiper,
    SwiperSlide
  },
  props: {
    ad: [Object, null]
  },
  setup() {
    const router = useRouter()
    const { getters, dispatch } = useStore()
    const state = reactive({
      banner: computed(() => getters['home/banner'])
    })

    const handleRedirect = bookId => {
      dispatch('handleHigh', { choiceId: state.banner.choiceId, bookId }, { root: true })
    }

    const handleActivity = () => {
      router.push({
        path: '/bulletin/186'
      })
    }

    return {
      state,
      handleRedirect,
      adTarget,
      bannerImg,
      handleActivity,
      modules: [Navigation, Pagination, Autoplay]
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/home/banner.scss"></style>
