import { FETCHDATA, VIDEOS, TOGGLEFAV, FAVLOADING } from './mutation-types'

export default {
  [FETCHDATA](state, payLoad) {
    state.tags = payLoad.tagsData
    state.videos = payLoad.videosData
  },
  [VIDEOS](state, payLoad) {
    state.videos = payLoad.data
  },
  [FAVLOADING](state, payLoad) {
    state.videos[payLoad.index].favLoading = 1
  },
  [TOGGLEFAV](state, payLoad) {
    state.videos[payLoad.index] = Object.assign(state.videos[payLoad.index], {
      isFav: payLoad.isFav,
      favLoading: 0
    })
  }
}
