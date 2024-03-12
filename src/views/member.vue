<template>
  <div class="member">
    <user-info />
    <div class="permanent" @click="handleClipboard">永久连结: {{ state.domainPageUrl }}</div>
    <div class="mine">
      <List />
    </div>
    <div v-if="Object.keys(state.cooperate).length" class="cooperate">
      <p>{{ state.cooperate.remark }}</p>
      <ul>
        <li>
          <div>
            <i class="el-icon-chat-dot-round" />
            聊天软件：{{ state.cooperate.software }}
          </div>
          <div>
            <i class="el-icon-user" />
            商务账号：<a target="_blank" :href="state.cooperate.url">{{ state.cooperate.username }}</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <MenuFooter />
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, computed, reactive } from 'vue'
import { toClipboard } from '@soerenmartius/vue3-clipboard'
import { ElMessage } from 'element-plus'
import MenuFooter from '/@/components/blocks/Footer.vue'
import UserInfo from '/@/components/blocks/UserInfo.vue'
import List from '/@/components/member/List.vue'

export default {
  name: 'Member',
  components: {
    List,
    MenuFooter,
    UserInfo
  },
  setup() {
    const { getters, dispatch, state: storeState } = useStore()
    const state = reactive({
      cooperate: computed(() => getters['member/cooperate']),
      domainPageUrl: computed(() => storeState.urlListDomain)
    })

    const handleClipboard = () => {
      toClipboard(state.domainPageUrl)
        .then(() => {
          ElMessage({
            message: '复制成功',
            type: 'success'
          })
        })
        .catch(() => {
          console.error('Clipboard Error!!')
        })
    }

    onMounted(() => {
      dispatch('member/fetchData')
    })
    return {
      state,
      handleClipboard
    }
  }
}
</script>

<style scoped lang="scss" src="/@/sass/member/index.scss"></style>
