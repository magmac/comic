<template>
  <div class="title">
    <el-skeleton :loading="!title" animated>
      <template #template>
        <el-skeleton-item variant="h1" />
      </template>
      <template #default>
        <h3>{{ title }}</h3>
        <router-link v-if="Object.keys(path).length" class="more" :to="path">
          更多
          <i class="icon el-icon-d-arrow-right" />
        </router-link>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    path: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/blocks/heading.scss"></style>
