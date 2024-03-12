import { getVideos, getRandomVideos, addMyVideo, deleteMyVideo, getVideoLinkid, preview } from '/@/api'
import { TOGGLEFAV, VIDEOS, VIDEOLINKID, FAVLOADING, PREVIEW } from './mutation-types'

export default {
  async fetchVideoLinkid({ commit }) {
    const data = await getVideoLinkid()
    commit({
      type: VIDEOLINKID,
      data
    })
  },

  async videos({ commit, rootState, dispatch }) {
    const { pagesize } = rootState
    dispatch('toggleLoading', true, { root: true })
    commit({
      type: VIDEOS,
      data: []
    })
    const res = await getVideos({ pageCount: pagesize })
    dispatch('toggleLoading', false, { root: true })
    commit({
      type: VIDEOS,
      data: res
    })
  },

  async randomVideos({ commit, state, rootState }, page) {
    const { videos } = state
    const { pagesize } = rootState
    const res = await getRandomVideos({ page, pageCount: pagesize })
    const data = videos.concat(res)
    commit({
      type: VIDEOS,
      data
    })
  },

  async toggleFav({ commit }, params) {
    const { id: vid, index, isFav } = params
    commit({
      type: FAVLOADING,
      index
    })
    isFav ? await deleteMyVideo({ vid }) : await addMyVideo({ vid })
    commit({
      type: TOGGLEFAV,
      index,
      isFav: !isFav
    })
  },

  async preview({ commit }, vid) {
    const data = await preview({ vid })
    commit({
      type: PREVIEW,
      data
    })
  }
}
