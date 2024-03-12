import { TOGGLEFAV, VIDEOS, VIDEOLINKID, FAVLOADING, PREVIEW } from './mutation-types'
export default {
  [VIDEOS](state, payLoad) {
    state.videos = payLoad.data
  },

  [VIDEOLINKID](state, payLoad) {
    state.videoLinkid = payLoad.data
  },

  [FAVLOADING](state, payLoad) {
    state.videos[payLoad.index].favLoading = 1
  },

  [TOGGLEFAV](state, payLoad) {
    state.videos[payLoad.index] = Object.assign(state.videos[payLoad.index], {
      isFav: payLoad.isFav,
      favLoading: 0
    })
  },

  [PREVIEW](state, payLoad) {
    state.preview = payLoad.data
  }
}
