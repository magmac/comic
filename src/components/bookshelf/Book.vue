<template>
  <div class="img">
    <img-load :src="image" />
    <div v-if="edit" class="mask">
      <div class="del" @click="handleDel(id)">
        <i class="el-icon-delete" />
      </div>
    </div>
  </div>
  <h6 class="title">{{ title }}</h6>
</template>
<script>
import ImgLoad from '/@/components/blocks/ImgLoad.vue'

export default {
  components: { ImgLoad },
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    edit: {
      type: Boolean,
      required: true
    }
  },
  emits: ['delete'],
  setup(props, { emit }) {
    const handleDel = id => {
      emit('delete', id)
    }
    return {
      handleDel
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/bookshelf/book.scss"></style>
