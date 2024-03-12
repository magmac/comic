<template>
  <el-skeleton :loading="loading" animated :count="3">
    <template #template>
      <div class="item">
        <el-skeleton-item variant="image" />
        <el-skeleton-item variant="h3" />
        <el-skeleton-item variant="text" />
      </div>
    </template>
    <template #default>
      <div v-if="books.length" class="box">
        <template v-for="(book, index) in books" :key="index">
          <div
            v-if="ad && index > 0 && (index + 1) % ad.interval === 0"
            class="item"
            @click="adTarget(ad.another, ad.clickurl)"
          >
            <div class="img">
              <img-load :src="ad.imgurl" />
            </div>
            <h6 class="a_h6">{{ ad.title }}</h6>
          </div>
          <div v-else class="item" @click="handleRedirect(book.id)">
            <div class="img">
              <div :class="`serialStatus ${book.status === 1 ? 'serialize' : 'finish'}`">
                {{ book.status === 1 ? '连载' : '完结' }}
              </div>
              <img-load :src="book.vertical" />
            </div>
            <h6>{{ book.title }}</h6>
            <span class="news">
              <i class="el-icon-star-on" />
              {{ (Math.random() * (10 - 9) + 9).toFixed(2) }}
              <i class="el-icon-notebook-2" />
              {{ toThousands(Math.floor(Math.random() * (10000 - 4000)) + 40000) }}
            </span>
          </div>
        </template>
      </div>
      <Empty v-else />
    </template>
  </el-skeleton>
</template>

<script>
import { useStore } from 'vuex'
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
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    ad: [Object, null]
  },
  setup(props) {
    const { dispatch } = useStore()

    const handleRedirect = bookId => {
      dispatch('handleHigh', { choiceId: props.choiceId, bookId }, { root: true })
    }

    return {
      handleRedirect,
      toThousands,
      adTarget
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/blocks/columnsBooks.scss"></style>
