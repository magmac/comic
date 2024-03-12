import { FETCHDATA } from './mutation-types'

export default {
  [FETCHDATA](state, payLoad) {
    state.info = payLoad.data
  }
}
