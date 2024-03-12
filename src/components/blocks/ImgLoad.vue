<template>
  <div :style="{ minHeight: state.imgLoading ? minHeight : 'auto' }" :class="['image', { error: state.imgError }]">
    <template v-if="!state.imgError">
      <transition>
        <div
          v-if="state.imgLoading"
          v-loading="state.imgLoading"
          element-loading-background="rgba(0, 0, 0, 0)"
          class="loading"
        ></div>
      </transition>
      <img ref="imgRef" :style="{ objectFit: fit }" :onerror="handleError" :onload="handleLoad" />
    </template>
  </div>
</template>

<script>
import { reactive, computed, toRefs, ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { getImageToBase64 } from '/@/utils'

export default {
  props: {
    src: {
      type: String,
      required: true
    },
    fit: {
      type: String,
      default: 'cover'
    },
    minHeight: {
      type: String,
      default: 'auto'
    }
  },
  setup(props) {
    const { src } = toRefs(props)
    const { state: storeState } = useStore()
    const imgRef = ref()

    const state = reactive({
      imgError: false,
      imgLoading: true,
      imgApiUrl: computed(() =>
        src.value.indexOf('http') > -1
          ? src.value
          : storeState.imgDomain + src.value.replace(/jpeg|jpg|png|gif/, 'html')
      )
    })

    const getImgBase64 = () => {
      if (!storeState.imgDomain) return
      state.imgError = false
      getImageToBase64(state.imgApiUrl).then(res => {
        if (res) imgRef.value.src = res
        else state.imgError = true
      })
    }

    const reload = () => {
      getImgBase64()
    }

    const handleError = () => {
      state.imgError = true
    }

    const handleLoad = () => {
      state.imgLoading = false
    }

    watch(
      () => state.imgApiUrl,
      () => {
        getImgBase64()
      }
    )

    onMounted(() => {
      getImgBase64()
    })

    return {
      imgRef,
      reload,
      handleError,
      handleLoad,
      state
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/blocks/imgLoad.scss"></style>
