<template>
  <Topbar :page-name="state.info.title" />
  <div v-if="Object.keys(state.info).length" class="directory">
    <div class="bigImg">
      <img-load :src="state.info.thumbX" fit="fill" />
    </div>

    <div class="info">
      <div class="title">
        {{ state.info.title }}
      </div>
      <div class="item">
        <div class="block">
          状态：<span>
            <b>{{ state.info.status === 1 ? '连载' : '完结' }}</b>
          </span>
        </div>
        <div class="block">
          作者：<span>{{ state.info.author }}</span>
        </div>
      </div>
      <div class="item">
        <div class="type">
          类型：<span :style="{ backgroundColor: typeColors[state.info.tid % 8] }">
            {{ state.info.typename }}
          </span>
        </div>
        <div class="news">
          <i class="el-icon-star-on" />
          {{ state.star }}
          <i class="el-icon-notebook-2" />
          {{ state.read }}
        </div>
      </div>

      <div class="button">
        <el-button
          :type="state.hasMyBook ? 'info' : 'danger'"
          :loading="state.isLoading"
          class="btn"
          plain
          @click="handleMyBook"
        >
          {{ state.hasMyBook ? '移除书架' : '收藏书架' }}
        </el-button>
        <el-button type="danger" class="btn" @click="handleRead">
          {{ state.lastReadChapterId === state.firstChapterId ? '开始阅读' : `继续阅读 (${state.lastReadChapter})` }}
        </el-button>
      </div>

      <p class="description">
        {{ state.info.description }}
      </p>

      <el-collapse v-model="state.activeNames">
        <el-collapse-item name="1">
          <template #title>
            <div class="headTitle"><i class="el-icon-notebook-2" /> 目录</div>
            <span class="number">共 {{ state.count }} 话</span>
          </template>
          <InfiniteScroll :count="state.chapters.length" @load="load">
            <ul class="chapters">
              <li v-for="(chapter, index) in state.chapters" :key="index">
                <router-link :to="`/read/${chapter.id}`">
                  <div class="left">
                    <div class="img">
                      <img-load :src="chapter.thumb" />
                    </div>
                    <span class="name">{{ chapter.name }}</span>
                  </div>
                  <div class="right">
                    {{ chapter.bookBean }}
                    <i class="el-icon-coin" />
                    <i class="el-icon-arrow-right" />
                  </div>
                </router-link>
              </li>
            </ul>
          </InfiniteScroll>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { onMounted, reactive, computed, watch } from 'vue'
import { toThousands } from '/@/utils'

import Topbar from '/@/components/blocks/Topbar.vue'
import ImgLoad from '/@/components/blocks/ImgLoad.vue'
import InfiniteScroll from '/@/components/blocks/InfiniteScroll.vue'

export default {
  name: 'Directory',
  components: { Topbar, ImgLoad, InfiniteScroll },
  setup() {
    const router = useRouter()
    const { state: storeState, dispatch, getters } = useStore()
    const { directory, typeColors } = storeState
    const state = reactive({
      info: computed(() => directory.info),
      count: computed(() => directory.catalog.count),
      chapters: computed(() => getters['directory/chapters']),
      lastReadChapter: computed(() => getters['directory/lastReadChapter']),
      lastReadChapterId: computed(() => getters['directory/lastReadChapterId']),
      firstChapterId: computed(() => getters['directory/firstChapterId']),
      hasMyBook: computed(() => directory.hasMyBook),
      star: (Math.random() * (10 - 9) + 9).toFixed(2),
      read: toThousands(Math.floor(Math.random() * (10000 - 4000)) + 40000),
      isLoading: false
    })

    watch(
      () => state.hasMyBook,
      () => {
        state.isLoading = false
      }
    )

    const handleRead = () => {
      router.push({
        path: `/read/${state.lastReadChapterId}`
      })
    }

    const load = page => {
      dispatch('directory/chapters', { cartoonId: state.info.id, page })
    }

    const handleMyBook = () => {
      state.isLoading = true
      dispatch('directory/toggleMyBook', state.info.id)
    }

    onMounted(() => {
      dispatch('directory/fetchData')
    })

    return {
      state,
      typeColors,
      load,
      handleRead,
      handleMyBook
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/directory.scss"></style>
