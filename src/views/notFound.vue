<template>
  <div class="error">
    <section>
      <div class="background"></div>
      <p>很抱歉 (シ_ _)シ ... <br />找不到这个页面啦！</p>
      <div class="button">
        <el-button type="danger" round @click="gotoBack">上一页</el-button>
        <el-button type="danger" round @click="gotoHome">回首页</el-button>
        <a></a>
      </div>
    </section>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'NotFound',
  setup(props) {
    const router = useRouter()

    const gotoBack = () => {
      router.back()
    }

    const gotoHome = () => {
      router.replace({
        path: '/'
      })
    }
    return {
      gotoBack,
      gotoHome
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/notFound.scss"></style>
