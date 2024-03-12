<template>
  <Topbar />
  <el-skeleton :loading="state.isLoading" animated :count="2">
    <template #template>
      <div class="item">
        <el-skeleton-item variant="image" />
        <el-skeleton-item variant="caption" />
      </div>
    </template>
    <template #default>
      <ul v-if="state.list.length" class="bulletin">
        <li v-for="item in state.list" :key="item.id" class="item">
          <router-link :to="{ name: 'BulletinPage', params: { id: item.id } }">
            <div class="img">
              <img-load minHeight="7rem" :src="item.imagePath" fit="contain" />
            </div>
            <div class="text">
              <h3>{{ item.title }}</h3>
              <span>{{ format(item.releaseDate, 'yyyy-MM-dd') }}</span>
            </div>
          </router-link>
        </li>
      </ul>
      <Empty v-else />
    </template>
  </el-skeleton>
</template>

<script>
import { format } from 'date-fns'
import { useStore } from 'vuex'
import { onMounted, reactive, computed } from 'vue'
import Topbar from '/@/components/blocks/Topbar.vue'
import ImgLoad from '/@/components/blocks/ImgLoad.vue'
import Empty from '/@/components/blocks/Empty.vue'

export default {
  name: 'Bulletin',
  components: { Topbar, ImgLoad, Empty },
  setup() {
    const { state: storeState, dispatch } = useStore()
    const { bulletin } = storeState
    const state = reactive({
      list: computed(() => bulletin.list),
      isLoading: computed(() => storeState.loading)
    })
    onMounted(() => {
      dispatch('bulletin/fetchData')
    })
    return {
      state,
      format
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/bulletin.scss"></style>
