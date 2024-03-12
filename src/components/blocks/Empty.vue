<template>
  <el-empty :description="description" :image="emptyImg" />
</template>

<script>
import emptyImg from '/@/assets/empty.png'

export default {
  props: {
    description: {
      type: String,
      default: '未找到相关内容'
    }
  },
  setup() {
    return {
      emptyImg
    }
  }
}
</script>
