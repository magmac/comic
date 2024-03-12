import { FETCHDATA, CLEARDATA, TOGGLEFAV, TOGGLEPLAYERFAV, FETCHLIKES, FAVLOADING } from './mutation-types'

export default {
  [FETCHDATA](state, payLoad) {
    state.detail = payLoad.data
  },

  [CLEARDATA](state) {
    state.detail = {}
  },

  [TOGGLEPLAYERFAV](state, payLoad) {
    state.detail.isFav = payLoad.isFav
  },

  [FAVLOADING](state, payLoad) {
    state.likes[payLoad.index].favLoading = 1
  },

  [TOGGLEFAV](state, payLoad) {
    state.likes[payLoad.index] = Object.assign(state.likes[payLoad.index], {
      isFav: payLoad.isFav,
      favLoading: 0
    })
  },

  [FETCHLIKES](state, payLoad) {
    state.likes = payLoad.data
  }
}
