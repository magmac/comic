<template>
  <Topbar :page-name="pageName" />
  <div class="more">
    <FullBooks :books="state.books" :choice-id="choiceId" :ad="state.ad_book_29" :loading="state.isLoading" />
    <template v-if="state.books.length > 0 && state.moreBooks.length">
      <Heading title="猜你喜欢" />
      <InfiniteScroll :count="state.moreBooks.length" :showEmpty="false" @load="load">
        <ColumnsBooks :books="state.moreBooks" :loading="false" :choice-id="choiceId" />
      </InfiniteScroll>
    </template>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { onMounted, reactive, computed, onUnmounted } from 'vue'
import Topbar from '/@/components/blocks/Topbar.vue'
import FullBooks from '/@/components/blocks/FullBooks.vue'
import ColumnsBooks from '/@/components/blocks/ColumnsBooks.vue'
import InfiniteScroll from '/@/components/blocks/InfiniteScroll.vue'
import Heading from '/@/components/blocks/Heading.vue'

export default {
  name: 'More',
  components: {
    Topbar,
    FullBooks,
    ColumnsBooks,
    InfiniteScroll,
    Heading
  },
  setup() {
    const route = useRoute()
    const { id } = route.params
    const { state: storeState, dispatch, getters } = useStore()
    const state = reactive({
      isLoading: computed(() => storeState.loading),
      books: computed(() => getters['more/cartoons']),
      moreBooks: computed(() => getters['more/moreCartoons']),
      ad_book_29: computed(() => getters['ad_book_29'])
    })

    let pageName = ''
    switch (id) {
      case '2':
        pageName = '精品荟萃'
        break
      case '3':
        pageName = '新书推荐'
        break
      case '10':
        pageName = '人气推荐'
        break
      case '44':
        pageName = '猜你喜欢'
        break
      default:
        break
    }

    onMounted(() => {
      dispatch('more/fetchData', id)
    })

    const load = page => {
      dispatch('more/moreCartoons', page)
    }

    onUnmounted(() => {
      dispatch('more/clearData')
    })

    return {
      state,
      choiceId: id | 0,
      load,
      pageName
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/more.scss"></style>
