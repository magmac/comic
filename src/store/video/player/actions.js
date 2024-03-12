import { ElMessageBox } from 'element-plus'
import router from '/@/router'
import { videoPlayer, addMyVideo, deleteMyVideo, getVideosByTag } from '/@/api'
import { FETCHDATA, CLEARDATA, TOGGLEFAV, TOGGLEPLAYERFAV, FETCHLIKES, FAVLOADING } from './mutation-types'

export default {
  async fetchData({ commit, dispatch }, vid) {
    dispatch('toggleLoading', true, { root: true })
    const data = await videoPlayer({ vid })
    dispatch('toggleLoading', false, { root: true })
    if (!data.video_path) {
      ElMessageBox.confirm(`剩余金币: <b>${data.bookbean.bookbean}</b>`, '免费观看次数已用完', {
        type: 'info',
        dangerouslyUseHTMLString: true,
        closeOnClickModal: false,
        showClose: false,
        cancelButtonText: '回视频列表',
        confirmButtonText: '去充值'
      })
        .then(() => {
          router.push({
            path: '/deposit',
            query: {
              vid
            }
          })
        })
        .catch(() => {
          router.push({
            path: '/video'
          })
        })
    }
    commit({
      type: FETCHDATA,
      data
    })
  },

  clearData({ commit }) {
    commit({
      type: CLEARDATA
    })
  },

  async getDoYouLikes({ commit, rootState }, tag) {
    const { pagesize } = rootState
    commit({
      type: FETCHLIKES,
      data: []
    })
    const data = await getVideosByTag({ tag, page: 1, pageCount: pagesize })
    commit({
      type: FETCHLIKES,
      data
    })
  },

  async togglePlayerFav({ commit }, params) {
    const { id: vid, isFav } = params
    isFav ? await deleteMyVideo({ vid }) : await addMyVideo({ vid })
    commit({
      type: TOGGLEPLAYERFAV,
      isFav: !isFav
    })
  },

  async toggleFav({ commit }, params) {
    const { id: vid, isFav, index } = params
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
