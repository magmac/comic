<template>
  <Topbar />
  <div class="category">
    <ul class="mainCategory">
      <li :class="{ active: state.gender === 1 }" @click="toggle('gender', 1)">男频</li>
      <li :class="{ active: state.gender === 2 }" @click="toggle('gender', 2)">女频</li>
      <li :class="{ active: state.serial === 1 }" @click="toggle('serial', 1)">连载</li>
      <li :class="{ active: state.serial === 2 }" @click="toggle('serial', 2)">完结</li>
    </ul>
    <el-skeleton :loading="!state.categories.length" animated :count="5">
      <template #template>
        <el-skeleton-item variant="text" />
      </template>
      <template #default>
        <ul class="mainCategory vice">
          <li
            v-for="(item, inex) in state.categories"
            :key="inex"
            :class="{ active: state.typeId === item.id }"
            @click="toggle('typeId', item.id)"
          >
            {{ item.typename }}
          </li>
        </ul>
      </template>
    </el-skeleton>
    <InfiniteScroll :count="state.books.length" :showEmpty="false" @load="load">
      <FullBooks :books="state.books" :choice-id="state.choiceId" :loading="state.isLoading" />
    </InfiniteScroll>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, reactive, computed, watch, onUnmounted } from 'vue'
import InfiniteScroll from '/@/components/blocks/InfiniteScroll.vue'
import Topbar from '/@/components/blocks/Topbar.vue'
import FullBooks from '/@/components/blocks/FullBooks.vue'

export default {
  name: 'Category',
  components: {
    InfiniteScroll,
    Topbar,
    FullBooks
  },
  setup() {
    const { state: storeState, dispatch, getters } = useStore()
    const { category } = storeState
    const state = reactive({
      isLoading: computed(() => storeState.loading),
      categories: computed(() => category.categories),
      books: computed(() => getters['category/cartoons']),
      choiceId: computed(() => category.choiceId),
      serial: 0,
      gender: 0,
      typeId: 0
    })

    const toggle = (changeType, id) => {
      state[changeType] = state[changeType] === id ? 0 : id
    }

    const load = page => {
      dispatch('category/cartoons', {
        status: state.serial,
        typeId: state.typeId,
        sexy: state.gender,
        page
      })
    }

    watch([() => state.serial, () => state.gender, () => state.typeId], ([currSerial, currGender, currTypeId]) => {
      dispatch('category/cartoons', {
        status: currSerial,
        typeId: currTypeId,
        sexy: currGender,
        page: 1
      })
    })

    onMounted(() => {
      dispatch('category/fetchData')
    })

    onUnmounted(() => {
      dispatch('category/clearData')
    })
    return {
      state,
      toggle,
      load
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/category.scss"></style>
