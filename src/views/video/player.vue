<template>
  <Topbar :page-name="Object.keys(state.detail).length ? state.detail.name : ''">
    <div v-if="Object.keys(state.detail).length" :class="['user', { long: state.detail.isVip }]">
      <span v-if="state.detail.isVip">vip</span>
      <i v-else class="el-icon-coin">{{ toThousands(state.detail.bookbean.bookbean) }}</i>
    </div>
  </Topbar>
  <el-skeleton :loading="state.isLoading" animated>
    <template #template>
      <el-skeleton-item variant="image" />
      <el-skeleton-item variant="h1" />
      <div class="flex">
        <el-skeleton-item variant="h3" />
        <el-skeleton-item variant="text" />
      </div>
    </template>
    <template #default>
      <template v-if="Object.keys(state.detail).length">
        <Media :path="state.detail.video_path" />
        <div class="info">
          <h3 class="title">
            {{ state.detail.name }}
          </h3>
          <ul v-if="state.detail.tags.length > 0" class="tags">
            <li v-for="(tag, idx) in state.detail.tags" :key="idx">
              <router-link
                :to="`/video/tag/${tag.id}`"
                :style="{ backgroundColor: typeColors[tag.id % typeColors.length] }"
              >
                {{ tag.name }}
              </router-link>
            </li>
          </ul>
          <div class="operating">
            <div class="news">
              <div>
                <i class="el-icon-time" />
                {{ formatSeconds(state.detail.m3u8_secs) }}
              </div>
              <div>
                <i class="el-icon-star-on" />
                {{ toThousands(state.detail.favorite) }}
                <i class="el-icon-view" />
                {{ toThousands(state.detail.view) }}
              </div>
            </div>
            <div class="btn">
              <el-button
                type="danger"
                icon="el-icon-share"
                size="mini"
                circle
                @click="handleSharePopup(state.detail.id, state.detail.img_path, state.detail.name)"
              ></el-button>
              <el-button
                :type="state.detail.isFav ? 'info' : 'danger'"
                :icon="state.detail.isFav ? 'el-icon-star-on' : 'el-icon-star-off'"
                size="mini"
                circle
                :loading="state.favLoading"
                @click="togglePlayerFav(state.detail.id, state.detail.isFav)"
              ></el-button>
            </div>
          </div>
        </div>
        <AdvFlow :ad="state.ad_flow_32" />
        <template v-if="state.likes.length">
          <Heading title="猜你喜欢" />
          <ColumnsVideos
            :loading="!state.likes.length"
            :videos="state.likes"
            :ad="state.ad_video_85"
            @fav="toggleFav($event)"
          />
        </template>
      </template>
      <Empty v-else />
    </template>
  </el-skeleton>
  <SharePopup
    v-if="state.showPopup"
    :id="state.shareData.id"
    :imagePath="state.shareData.imagePath"
    :name="state.shareData.name"
    @close="togglePopup"
  />
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, reactive, computed, watch } from 'vue'
import { formatSeconds, toThousands } from '/@/utils'
import Topbar from '/@/components/blocks/Topbar.vue'
import Media from '/@/components/blocks/Media.vue'
import SharePopup from '/@/components/blocks/SharePopup.vue'
import Heading from '/@/components/blocks/Heading.vue'
import ColumnsVideos from '/@/components/blocks/ColumnsVideos.vue'
import AdvFlow from '/@/components/blocks/AdvFlow.vue'
import Empty from '/@/components/blocks/Empty.vue'

export default {
  name: 'Player',
  components: { Topbar, Media, Heading, ColumnsVideos, AdvFlow, Empty, SharePopup },
  setup() {
    const { state: storeState, dispatch, getters } = useStore()
    const route = useRoute()
    const { video, typeColors } = storeState
    const state = reactive({
      showPopup: false,
      shareData: {},
      isLoading: computed(() => storeState.loading),
      detail: computed(() => video.player.detail),
      likes: computed(() => video.player.likes),
      ad_flow_32: computed(() => getters['ad_flow_32']),
      ad_video_85: computed(() => getters['ad_video_85']),
      favLoading: false
    })

    watch(
      () => state.detail.isFav,
      () => {
        state.favLoading = false
      }
    )

    watch(
      () => state.detail.tags,
      () => {
        if (Object.keys(state.detail.tags).length) {
          const randomId = Math.floor(Math.random() * Object.keys(state.detail.tags).length)
          dispatch('video/player/getDoYouLikes', state.detail.tags[randomId].id)
        }
      }
    )

    watch(
      () => route.path,
      () => {
        if (route.name !== 'Player') return
        dispatch('video/player/fetchData', route.params.id)
      }
    )

    const togglePlayerFav = (id, isFav) => {
      state.favLoading = true
      dispatch('video/player/togglePlayerFav', { id, isFav })
    }

    const toggleFav = params => {
      dispatch('video/player/toggleFav', params)
    }

    const togglePopup = () => {
      state.showPopup = !state.showPopup
    }

    const handleSharePopup = (id, imagePath, name) => {
      state.shareData = { id, imagePath, name }
      togglePopup()
    }

    onMounted(() => {
      dispatch('video/player/fetchData', route.params.id)
    })

    onUnmounted(() => {
      dispatch('video/player/clearData')
    })

    return {
      state,
      typeColors,
      formatSeconds,
      toThousands,
      togglePlayerFav,
      toggleFav,
      togglePopup,
      handleSharePopup
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/video/player.scss"></style>
