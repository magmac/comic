<template>
  <div class="top">
    <div class="column"><i class="el-icon-video-camera" />视频 ({{ state.videos.length }})</div>
    <div class="column">
      <template v-if="state.videos.length">
        <template v-if="!state.edit">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="toggleEdit">管理</el-button>
        </template>
        <template v-else>
          <!-- <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
          >
            一键删除
          </el-button> -->
          <el-button type="success" icon="el-icon-check" size="mini" @click="toggleEdit">完成</el-button>
        </template>
      </template>
    </div>
  </div>
  <InfiniteScroll :count="state.videos.length" :showEmpty="false" @load="load">
    <el-skeleton :loading="state.isLoading" animated :count="2">
      <template #template>
        <div class="skeleton_columns">
          <el-skeleton-item variant="image" />
          <el-skeleton-item variant="h5" />
        </div>
      </template>
      <template #default>
        <ul v-if="state.videos.length" class="list">
          <li v-for="(video, index) in state.videos" :key="index" class="item" @click="handleLink(video.id)">
            <div class="date">
              <i class="el-icon-time" />
              {{ formatSeconds(video.video_long) }}
            </div>
            <Drama :info="video" :edit="state.edit" @delete="deleteVideo(video.id, index)" />
          </li>
        </ul>
        <Empty v-else />
      </template>
    </el-skeleton>
  </InfiniteScroll>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { onMounted, reactive, computed } from 'vue'
import Drama from '/@/components/video/myVideo/Drama.vue'
import { formatSeconds } from '/@/utils'
import InfiniteScroll from '/@/components/blocks/InfiniteScroll.vue'
import Empty from '/@/components/blocks/Empty.vue'

export default {
  components: { Drama, InfiniteScroll, Empty },
  setup() {
    const router = useRouter()
    const { dispatch, state: storeState } = useStore()
    const { video } = storeState
    const state = reactive({
      isLoading: computed(() => storeState.loading),
      videos: computed(() => video.myVideo.myVideos),
      edit: false
    })

    const load = page => {
      dispatch('video/myVideo/fetchMyVideos', page)
    }

    const deleteVideo = (id, index) => {
      dispatch('video/myVideo/deleFavVideo', { id, index })
    }

    const toggleEdit = () => {
      state.edit = !state.edit
    }

    const handleLink = id => {
      if (state.edit) return
      router.push({
        path: `/video/player/${id}`
      })
    }

    onMounted(() => {
      dispatch('video/myVideo/fetchMyVideos', 1)
    })

    return {
      state,
      deleteVideo,
      toggleEdit,
      handleLink,
      formatSeconds,
      load
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/video/myVideo/myVideos.scss"></style>
