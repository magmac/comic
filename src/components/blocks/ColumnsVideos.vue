<template>
  <el-skeleton :loading="loading" animated :count="4">
    <template #template>
      <div class="skeleton_columns">
        <el-skeleton-item variant="image" />
        <el-skeleton-item variant="h5" />
        <el-skeleton-item variant="text" class="skeleton_text1" />
        <el-skeleton-item variant="text" class="skeleton_text2" />
      </div>
    </template>
    <template #default>
      <div v-if="videos.length" class="columnsVideos">
        <template v-for="(video, index) in videos" :key="index">
          <div
            v-if="ad && index > 0 && (index + 1) % ad.interval === 0"
            class="a_box"
            @click="adTarget(ad.another, ad.clickurl)"
          >
            <div class="img">
              <img-load :src="ad.imgurl" />
            </div>
            <h3 class="h3">{{ ad.title }}</h3>
          </div>
          <div class="columns">
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
              <div class="operating">
                <div class="news">
                  <div class="fav">
                    <i class="el-icon-star-on" />
                    {{ toThousands(video.favcounts) }}
                    <i class="el-icon-view" />
                    {{ toThousands(video.playcounts) }}
                  </div>
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
          </div>
        </template>
      </div>
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
      required: true
    },
    ad: [Object, null]
  },
  emits: ['fav'],
  setup(props, { emit }) {
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

    return {
      state,
      toThousands,
      formatSeconds,
      handleFav,
      adTarget,
      togglePopup,
      handleSharePopup
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/blocks/columnsVideos.scss"></style>
