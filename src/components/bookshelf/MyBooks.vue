<template>
  <div class="box">
    <el-skeleton :loading="!state.books" animated :count="3">
      <template #template>
        <div class="item">
          <el-skeleton-item variant="image" />
          <el-skeleton-item variant="h3" />
          <el-skeleton-item variant="text" />
        </div>
      </template>
      <template #default>
        <template v-if="state.books.length">
          <div class="top">
            <div class="column">
              <el-button v-if="!state.edit" type="primary" icon="el-icon-edit" size="mini" @click="toggleEdit"
                >管理</el-button
              >
              <el-button v-else type="success" icon="el-icon-check" size="mini" @click="toggleEdit">完成</el-button>
            </div>
          </div>
          <ul class="list">
            <li v-for="(book, index) in state.books" :key="index" class="item" @click="handleLink(book.id)">
              <Book
                :id="book.id"
                :image="book.vertical"
                :title="book.title"
                :edit="state.edit"
                @delete="deleteBook($event, index)"
              />
            </li>
          </ul>
        </template>
        <Empty v-else />
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { onMounted, reactive, computed } from 'vue'
import Book from '/@/components/bookshelf/Book.vue'
import Empty from '/@/components/blocks/Empty.vue'

export default {
  components: { Book, Empty },
  setup() {
    const router = useRouter()
    const { dispatch, getters } = useStore()
    const state = reactive({
      books: computed(() => getters['bookshelf/myBooks']),
      edit: false
    })

    const deleteBook = (bookid, index) => {
      dispatch('bookshelf/deleteMyCartoon', { bookid, index })
    }

    const toggleEdit = () => {
      state.edit = !state.edit
    }

    const handleLink = bookId => {
      if (state.edit) return
      router.push({
        path: `/directory/${bookId}`
      })
    }

    onMounted(() => {
      dispatch('bookshelf/fetchMyCartoons')
    })

    return {
      state,
      deleteBook,
      toggleEdit,
      handleLink
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/bookshelf/myBooks.scss"></style>
