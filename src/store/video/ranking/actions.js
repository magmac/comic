import { useRoute } from 'vue-router'
import { analyticsByTag, getRankingTags, getVideosByTag, addMyVideo, deleteMyVideo } from '/@/api'
import { FETCHDATA, VIDEOS, TOGGLEFAV, FAVLOADING } from './mutation-types'

export default {
  async fetchData({ commit, rootState, dispatch }) {
    const {
      params: { id }
    } = useRoute()
    const { pagesize } = rootState
    dispatch('toggleLoading', true, { root: true })
    await Promise.all([
      getRankingTags(),
      getVideosByTag({ tag: id, page: 1, pageCount: pagesize }),
      analyticsByTag({ tag: id })
    ]).then(datas => {
      const [tagsData, videosData] = datas
      commit({
        type: FETCHDATA,
        tagsData,
        videosData
      })
    })
    dispatch('toggleLoading', false, { root: true })
  },

  async fetchVideos({ commit, state, rootState, dispatch }, params) {
    const { page, tag } = params
    const { videos } = state
    const { pagesize } = rootState
    if (page === 1) {
      dispatch('toggleLoading', true, { root: true })
      commit({
        type: VIDEOS,
        data: []
      })
    }
    await Promise.all([getVideosByTag(Object.assign(params, { pageCount: pagesize })), analyticsByTag({ tag })]).then(
      datas => {
        const [videoRes] = datas
        const data = page > 1 ? videos.concat(videoRes) : videoRes
        commit({
          type: VIDEOS,
          data
        })
      }
    )
    dispatch('toggleLoading', false, { root: true })
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
  }
}
