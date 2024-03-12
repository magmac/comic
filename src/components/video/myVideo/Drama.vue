<template>
  <div class="img">
    <img-video-load :src="info.thumbImg" />
    <div v-if="edit" class="mask">
      <div class="del" @click="emit('delete')">
        <i class="el-icon-delete" />
      </div>
    </div>
  </div>
  <h6>{{ info.name }}</h6>
</template>
<script>
import ImgVideoLoad from '/@/components/blocks/ImgVideoLoad.vue'

export default {
  components: { ImgVideoLoad },
  props: {
    info: {
      type: Object,
      required: true
    },
    edit: {
      type: Boolean,
      required: true
    }
  },
  emits: ['delete'],
  setup(props, { emit }) {
    return {
      emit
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/video/myVideo/drama.scss"></style>
