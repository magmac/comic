<template>
  <el-skeleton :loading="loading" animated :count="3">
    <template #template>
      <div class="book">
        <div class="img">
          <el-skeleton-item variant="image" />
        </div>
        <div class="info">
          <el-skeleton-item variant="h1" />
          <el-skeleton-item variant="h3" />
          <el-skeleton-item variant="text" />
        </div>
      </div>
    </template>
    <template #default>
      <ul v-if="books.length">
        <template v-for="(book, index) in books" :key="index">
          <li
            v-if="ad && index > 0 && (index + 1) % ad.interval === 0"
            class="book"
            @click="adTarget(ad.another, ad.clickurl)"
          >
            <div class="img">
              <img-load :src="ad.imgurl" />
            </div>
            <div class="info">
              <h6 class="a_h6">{{ ad.title }}</h6>
              <div class="description">
                {{ ad.description }}
              </div>
            </div>
          </li>
          <li v-else class="book" @click="handleRedirect(book.id)">
            <div class="img">
              <div :class="`serialStatus ${book.status === 1 ? 'serialize' : 'finish'}`">
                {{ book.status === 1 ? '连载' : '完结' }}
              </div>
              <img-load :src="book.vertical" />
            </div>
            <div class="info">
              <h6>{{ book.title }}</h6>
              <div class="description">
                {{ book.description }}
              </div>
              <div class="type">
                <span :style="{ backgroundColor: typeColors[book.tid % typeColors.length] }">
                  {{ book.typename }}
                </span>
              </div>
              <div class="author">作者: {{ book.author }}</div>
              <div class="news">
                <i class="el-icon-star-on" />
                {{ (Math.random() * (10 - 9) + 9).toFixed(2) }}
                <i class="el-icon-notebook-2" />
                {{ toThousands(Math.floor(Math.random() * (10000 - 4000)) + 40000) }}
              </div>
            </div>
          </li>
        </template>
      </ul>
      <Empty v-else />
    </template>
  </el-skeleton>
</template>

<script>
import { toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { toThousands, adTarget } from '/@/utils'
import ImgLoad from '/@/components/blocks/ImgLoad.vue'
import Empty from '/@/components/blocks/Empty.vue'

export default {
  components: { ImgLoad, Empty },
  props: {
    books: {
      type: Array,
      required: true
    },
    choiceId: {
      type: Number,
      default: 0
    },
    pageJumpWay: {
      type: String, // high 高爆庫, normal 正常導頁, directory 目錄
      default: 'high'
    },
    loading: {
      type: Boolean,
      required: true
    },
    ad: [Object, null]
  },
  setup(props) {
    const router = useRouter()
    const { choiceId, pageJumpWay } = toRefs(props)
    const { state: storeState, dispatch } = useStore()
    const { typeColors } = storeState
    const handleRedirect = bookId => {
      switch (pageJumpWay.value) {
        case 'high':
          dispatch('handleHigh', { choiceId: choiceId.value, bookId }, { root: true })
          break
        case 'directory':
          return router.push({
            path: `/directory/${bookId}`
          })
        default:
          break
      }
    }
    return {
      handleRedirect,
      typeColors,
      toThousands,
      adTarget
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/blocks/fullBooks.scss"></style>
