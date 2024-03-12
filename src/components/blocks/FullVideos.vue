<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <el-skeleton-item variant="image" />
      <el-skeleton-item variant="h1" />
      <div class="flex">
        <el-skeleton-item variant="h3" />
        <el-skeleton-item variant="text" />
      </div>
    </template>
    <template #default>
      <template v-if="videos.length">
        <div v-for="(video, index) in videos" :key="index" class="full">
          <div v-if="ad && index % ad.interval === 0" @click="adTarget(ad.another, ad.clickurl)">
            <div class="link"><img-load :src="ad.imgurl" /></div>
            <div class="info">
              <div class="title a_title">{{ ad.title }}</div>
              <div class="a_desc">{{ ad.description }}</div>
            </div>
          </div>
          <template v-else>
            <!-- <router-link class="link" :to="`/video/player/${video.id}`" @mouseover="handleHover(video.id)"> -->
            <router-link class="link" :to="`/video/player/${video.id}`">
              <div class="date">
                <i class="el-icon-time" />
                {{ formatSeconds(video.video_long) }}
              </div>
              <img-video-load :src="video.thumbImg" />
            </router-link>
            <div class="info">
              <router-link class="title" :to="`/video/player/${video.id}`">
                {{ video.name }}
              </router-link>
              <ul v-if="video.tags.length > 0" class="tags">
                <li v-for="(tag, idx) in video.tags" :key="idx">
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
                    <i class="el-icon-star-on" />
                    {{ toThousands(video.favcounts) }}
                    <i class="el-icon-view" />
                    {{ toThousands(video.playcounts) }}
                  </div>
                </div>
                <div class="btn">
                  <el-button
                    type="danger"
                    icon="el-icon-share"
                    size="mini"
                    circle
                    @click="handleSharePopup(video.id, video.thumbImg, video.name)"
                  ></el-button>
                  <el-button
                    :type="video.isFav ? 'info' : 'danger'"
                    :icon="video.isFav ? 'el-icon-star-on' : 'el-icon-star-off'"
                    size="mini"
                    :loading="!!video.favLoading"
                    circle
                    @click="handleFav(video.id, video.isFav, index)"
                  ></el-button>
                </div>
              </div>
            </div>
          </template>
        </div>
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
import { reactive } from 'vue'
import SharePopup from '/@/components/blocks/SharePopup.vue'
import ImgVideoLoad from '/@/components/blocks/ImgVideoLoad.vue'
import ImgLoad from '/@/components/blocks/ImgLoad.vue'
import { formatSeconds, toThousands, adTarget } from '/@/utils'
import Empty from '/@/components/blocks/Empty.vue'

export default {
  components: { ImgLoad, ImgVideoLoad, SharePopup, Empty },
  props: {
    videos: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    ad: [Object, null]
  },
  emits: ['fav'],
  setup(props, { emit }) {
    const { state: storeState, dispatch } = useStore()
    const { typeColors } = storeState
    const state = reactive({
      showPopup: false,
      shareData: {}
    })

    const handleFav = (id, isFav, index) => {
      emit('fav', { id, isFav, index })
    }

    const togglePopup = () => {
      state.showPopup = !state.showPopup
    }

    const handleSharePopup = (id, imagePath, name) => {
      state.shareData = { id, imagePath, name }
      togglePopup()
    }

    const handleHover = vid => {
      dispatch('video/preview', { vid }, { root: true })
    }
    return {
      state,
      handleFav,
      togglePopup,
      handleSharePopup,
      typeColors,
      formatSeconds,
      toThousands,
      adTarget,
      handleHover
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/blocks/fullVideos.scss"></style>
