import { searchVideo, addMyVideo, deleteMyVideo, getKeywords } from '/@/api'
import { FETCHDATA, FETCHVIDEOS, TOGGLEFAV, FAVLOADING } from './mutation-types'

export default {
  async fetchData({ commit, state, rootState, dispatch }, params) {
    const { page, keyword } = params
    const { videos, keywords } = state
    const { pagesize } = rootState
    if (!keywords.length) {
      dispatch('toggleLoading', true, { root: true })
      await Promise.all([searchVideo({ page, vname: keyword, pageCount: pagesize }), getKeywords()]).then(datas => {
        const [searchData, kData] = datas
        const vData = page === 1 ? searchData : videos.concat(searchData)
        commit({
          type: FETCHDATA,
          vData,
          kData
        })
      })
    } else {
      if (page === 1) {
        dispatch('toggleLoading', true, { root: true })
        commit({
          type: FETCHVIDEOS,
          data: []
        })
      }
      const res = await searchVideo({ page, vname: keyword, pageCount: pagesize })
      const data = page === 1 ? res : videos.concat(res)
      commit({
        type: FETCHVIDEOS,
        data
      })
    }
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
