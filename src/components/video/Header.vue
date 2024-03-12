<template>
  <header>
    <div class="logo" />
    <el-form class="form" @submit.prevent="handleSubmit">
      <el-input v-model="state.value" size="mini" placeholder="视频搜索" clearable>
        <template #append>
          <el-button icon="el-icon-search" native-type="submit" />
        </template>
      </el-input>
    </el-form>
  </header>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      value: ''
    })

    const handleSubmit = () => {
      if (!state.value) return
      router.push({
        path: `/video/search/${state.value}`
      })
    }

    return {
      state,
      handleSubmit
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/video/index/header.scss"></style>
