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
            <!-- <div class="column"><i class="el-icon-reading" />记录 ({{ state.books.length }})</div> -->
            <div class="column">
              <template v-if="!state.edit">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="toggleEdit">管理</el-button>
              </template>
              <template v-else>
                <el-button type="success" icon="el-icon-check" size="mini" @click="toggleEdit">完成</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="deleteAll">
                  一键删除 ({{ state.books.length }})
                </el-button>
              </template>
            </div>
          </div>
          <ul class="list">
            <li v-for="(book, index) in state.books" :key="index" class="item" @click="handleLink(book.chapterId)">
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
import { ElMessageBox } from 'element-plus'
import Book from '/@/components/bookshelf/Book.vue'
import Empty from '/@/components/blocks/Empty.vue'

export default {
  components: { Book, Empty },
  setup() {
    const router = useRouter()
    const { dispatch, getters } = useStore()
    const state = reactive({
      books: computed(() => getters['bookshelf/historyBooks']),
      edit: false
    })

    const deleteBook = (bookId, index) => {
      dispatch('bookshelf/deleteHistoryCartoon', { bookId, index })
    }

    const deleteAll = () => {
      ElMessageBox.confirm(`确定要删除全部阅读记录？`, '确认信息', {
        type: 'info',
        cancelButtonText: '取消',
        confirmButtonText: '确定'
      }).then(() => {
        dispatch('bookshelf/deleteAllHistoryCartoon')
      })
    }

    const toggleEdit = () => {
      state.edit = !state.edit
    }

    const handleLink = chapterId => {
      if (state.edit) return
      router.push({
        path: `/read/${chapterId}`
      })
    }

    onMounted(() => {
      dispatch('bookshelf/fetchHistoryCartoons')
    })

    return {
      state,
      deleteBook,
      toggleEdit,
      handleLink,
      deleteAll
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/bookshelf/historyBooks.scss"></style>
