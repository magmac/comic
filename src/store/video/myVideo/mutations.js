import { HISTORY, MYVIDEOS, DELE_MYVIDEO, DELE_HISTORY } from './mutation-types'

export default {
  [HISTORY](state, payLoad) {
    state.history = payLoad.data
  },
  [MYVIDEOS](state, payLoad) {
    state.myVideos = payLoad.data
  },
  [DELE_HISTORY](state, payLoad) {
    state.history.splice(payLoad.index, 1)
  },
  [DELE_MYVIDEO](state, payLoad) {
    state.myVideos.splice(payLoad.index, 1)
  }
}
