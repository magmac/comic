<template>
  <Topbar />
  <iframe
    ref="iframeRef"
    :style="{ height: state.height }"
    :src="customerUrl"
    frameborder="0"
    scrolling="no"
    allowfullscreen
    width="100%"
  />
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import Topbar from '/@/components/blocks/Topbar.vue'

const { VITE_CUSTOMER_URL: customerUrl } = import.meta.env
export default {
  name: 'Customer',
  components: { Topbar },
  setup() {
    const iframeRef = ref()
    const state = reactive({
      height: 0
    })
    const resizeFrameHeight = () => {
      state.height = `calc(${document.documentElement.clientHeight}px - 3rem)`
    }

    onMounted(() => {
      resizeFrameHeight()
    })

    return {
      state,
      iframeRef,
      customerUrl
    }
  }
}
</script>
