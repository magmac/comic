<template>
  <Topbar :page-name="title" />
  <div class="tabs">
    <router-link replace :to="{ path: '/bookshelf/favorite' }"> 我的书架 </router-link>
    <router-link replace :to="{ path: '/bookshelf/history' }"> 阅读记录 </router-link>
  </div>
  <router-view />
  <template v-if="state.likeBooks.books.length">
    <Heading title="猜你喜欢" />
    <ColumnsBooks :books="state.likeBooks.books" :loading="false" :choice-id="state.likeBooks.choiceId" />
  </template>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { onMounted, reactive, computed, watch, ref } from 'vue'
import Topbar from '/@/components/blocks/Topbar.vue'
import ColumnsBooks from '/@/components/blocks/ColumnsBooks.vue'
import Heading from '/@/components/blocks/Heading.vue'

export default {
  name: 'Bookshelf',
  components: {
    Topbar,
    ColumnsBooks,
    Heading
  },
  setup() {
    const { dispatch, getters } = useStore()
    const route = useRoute()
    const title = ref(route.meta.title)
    const state = reactive({
      likeBooks: computed(() => getters['bookshelf/likeBooks'])
    })

    watch(
      () => route.meta,
      () => {
        title.value = route.meta.title
      }
    )

    onMounted(() => {
      dispatch('bookshelf/fetchData')
    })
    return {
      state,
      title
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/bookshelf/index.scss"></style>
