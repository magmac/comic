import { ElMessage } from 'element-plus'
import {
  getHistoryCartoons,
  getMyCartoons,
  getRecommendCartoons,
  operatingMyCartoon,
  deleteHistoryCartoon as apiDeleteHistoryCartoon,
  deleteAllHistoryCartoon as apiDeleteAllHistoryCartoon
} from '/@/api'
import {
  FETCHDATA,
  HISTORY,
  MY_BOOKS,
  DELE_MY_BOOKS,
  DELE_HISTORY_BOOKS,
  DELE_ALL_HISTORY_BOOKS
} from './mutation-types'

export default {
  async fetchData({ commit }) {
    const data = await getRecommendCartoons({ ids: 44 })
    commit({
      type: FETCHDATA,
      data
    })
  },

  async fetchHistoryCartoons({ commit }) {
    const data = await getHistoryCartoons()
    commit({
      type: HISTORY,
      data
    })
  },

  async fetchMyCartoons({ commit }) {
    const data = await getMyCartoons()
    commit({
      type: MY_BOOKS,
      data
    })
  },

  async deleteMyCartoon({ commit }, params) {
    const { bookid, index } = params
    const data = await operatingMyCartoon({ bookid })
    if (data) {
      commit({
        type: DELE_MY_BOOKS,
        index
      })
    }
  },

  async deleteHistoryCartoon({ commit }, params) {
    const { bookId, index } = params
    await apiDeleteHistoryCartoon({ bookId })
    commit({
      type: DELE_HISTORY_BOOKS,
      index
    })
  },

  async deleteAllHistoryCartoon({ commit }) {
    await apiDeleteAllHistoryCartoon()
    ElMessage({
      type: 'success',
      message: '一键删除成功'
    })
    commit({
      type: DELE_ALL_HISTORY_BOOKS
    })
  }
}
