import { getBulletin, getBulletinDetail } from '/@/api'
import { useRoute } from 'vue-router'
import { FETCHDATA, BULLETIN, CLEAR_DATA } from './mutation-types'

export default {
  async fetchData({ commit, dispatch }) {
    dispatch('toggleLoading', true, { root: true })
    const res = await getBulletin()
    dispatch('toggleLoading', false, { root: true })
    const { list } = res
    commit({
      type: FETCHDATA,
      data: list
    })
  },

  async fetchBulletin({ commit }) {
    const {
      params: { id }
    } = useRoute()
    const data = (await getBulletinDetail({ id })) || {}
    commit({
      type: BULLETIN,
      data
    })
  },

  clearData({ commit }) {
    commit({
      type: CLEAR_DATA
    })
  }
}
