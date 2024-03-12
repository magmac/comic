import { FETCHDATA } from './mutation-types'

export default {
  [FETCHDATA](state, payLoad) {
    state.cooperate = payLoad.data || []
  }
}
