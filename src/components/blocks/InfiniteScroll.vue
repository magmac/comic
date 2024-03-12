<template>
  <div v-infinite-scroll="handleLoad" infinite-scroll-immediate="false" infinite-scroll-delay="500">
    <slot />
    <template v-if="!count">
      <Empty v-if="showEmpty" />
    </template>
    <p v-else-if="state.last" class="more">沒有更多了</p>
    <p v-else class="more">
      <i class="el-icon-loading" />
      拼命加载中
    </p>
  </div>
  <el-backtop :right="10" :bottom="80" />
</template>

<script>
import { reactive, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import Empty from '/@/components/blocks/Empty.vue'

export default {
  components: { Empty },
  props: {
    total: {
      type: Number,
      default: 0
    },
    initPage: {
      type: Number,
      default: 1
    },
    count: {
      type: Number,
      required: true
    },
    showEmpty: {
      type: Boolean,
      default: true
    }
  },
  emits: ['load'],
  setup(props, { emit }) {
    const { state: storeState } = useStore()
    const { pagesize } = storeState
    const state = reactive({
      last: false,
      page: props.initPage
    })

    watch(
      () => props.count,
      curr => {
        if (curr <= pagesize) state.page = 1
        if (props.total > 0 && curr === props.total) {
          state.last = true
        } else if (curr % pagesize) state.last = true
      }
    )

    const handleLoad = () => {
      if (state.last) return
      state.page += 1
      emit('load', state.page)
    }

    onMounted(() => {
      if (props.count && props.count < pagesize) state.last = true
    })

    return {
      handleLoad,
      state
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/blocks/infiniteScroll.scss"></style>
