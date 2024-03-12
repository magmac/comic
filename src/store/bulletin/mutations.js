import { FETCHDATA, BULLETIN, CLEAR_DATA } from './mutation-types'

export default {
  [FETCHDATA](state, payLoad) {
    state.list = payLoad.data
  },
  [BULLETIN](state, payLoad) {
    state.detail = payLoad.data
  },
  [CLEAR_DATA](state) {
    state.detail = {}
  }
}
