<template>
  <div v-loading="loading" class="fixed mask" element-loading-background="rgba(0, 0, 0, 0)">
    <div v-show="!loading" class="box" :style="{ width: `${width}%` }">
      <slot />
      <div v-if="showClose" class="close">
        <i class="el-icon-circle-close" @click="handleClose" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const handleClose = () => {
      emit('close')
    }
    return {
      handleClose
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/blocks/popupMask.scss"></style>
