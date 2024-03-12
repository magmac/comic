import { deleteMyVideo, deleteHistoryVideo, getMyVideos, getHistoryVideos } from '/@/api'
import { HISTORY, MYVIDEOS, DELE_MYVIDEO, DELE_HISTORY } from './mutation-types'
export default {
  async fetchMyVideos({ commit, state, rootState, dispatch }, page) {
    const { myVideos } = state
    const { pagesize } = rootState
    if (page === 1) {
      dispatch('toggleLoading', true, { root: true })
      commit({
        type: MYVIDEOS,
        data: []
      })
    }
    const res = await getMyVideos({ page, pageCount: pagesize })
    const data = page > 1 ? myVideos.concat(res) : res
    dispatch('toggleLoading', false, { root: true })
    commit({
      type: MYVIDEOS,
      data
    })
  },

  async fetchHistory({ commit, state, rootState, dispatch }, page) {
    const { history } = state
    const { pagesize } = rootState
    if (page === 1) {
      dispatch('toggleLoading', true, { root: true })
      commit({
        type: HISTORY,
        data: []
      })
    }
    const res = await getHistoryVideos({ page, pageCount: pagesize })
    const data = page > 1 ? history.concat(res) : res
    dispatch('toggleLoading', false, { root: true })
    commit({
      type: HISTORY,
      data
    })
  },

  async deleFavVideo({ commit }, params) {
    const { id: vid, index } = params
    await deleteMyVideo({ vid })
    commit({
      type: DELE_MYVIDEO,
      index
    })
  },

  async deleHistory({ commit }, params) {
    const { id: hisid, index } = params
    await deleteHistoryVideo({ hisid })
    commit({
      type: DELE_HISTORY,
      index
    })
  }
}
