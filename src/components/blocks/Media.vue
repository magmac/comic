<template>
  <div class="player">
    <vue-plyr ref="vuePlyr" :options="state.playerOptions">
      <video ref="video"></video>
    </vue-plyr>
  </div>
</template>

<script>
import { reactive, computed, toRefs, ref, onMounted, onBeforeUnmount } from 'vue'
import Hls from 'hls.js'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

const { VITE_VIDEO_API_BASE_URL: apiUrl } = import.meta.env
export default {
  components: {
    VuePlyr
  },
  props: {
    path: {
      type: String,
      default() {
        return ''
      }
    }
  },
  setup(props) {
    const { path } = toRefs(props)
    const vuePlyr = ref(null)
    const video = ref(null)
    const state = reactive({
      playerUrl: computed(() => `${apiUrl + path.value}.m3u8`),
      playerOptions: {
        controls: ['play', 'pip', 'play-large', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
        settings: ['quality', 'speed'],
        autoplay: true,
        speed: { selected: 1, options: [0.5, 1, 2] }
      },
      isHlsSupported: Hls.isSupported(),
      hls: null
    })

    const createPlayer = () => {
      if (state.isHlsSupported) {
        const hls = new Hls()
        state.hls = hls
        hls.attachMedia(vuePlyr.value.player.media)
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          hls.loadSource(state.playerUrl)
        })
      } else {
        video.value.src = state.playerUrl
        video.value.addEventListener('loadedmetadata', () => {
          video.value.play()
        })
      }
    }

    onMounted(() => {
      if (state.playerUrl) createPlayer()
    })

    onBeforeUnmount(() => {
      if (state.isHlsSupported) {
        state.hls.stopLoad()
        state.hls.destroy()
      }
    })

    return {
      state,
      vuePlyr,
      video
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/blocks/media.scss"></style>
