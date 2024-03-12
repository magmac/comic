<template>
  <PopupMask v-bind="$attrs">
    <GiftRelus />
  </PopupMask>
</template>
<script>
import PopupMask from '/@/components/blocks/PopupMask.vue'
import GiftRelus from '/@/components/blocks/GiftRelus.vue'

export default {
  components: {
    GiftRelus,
    PopupMask
  },
  inheritAttrs: false
}
</script>
