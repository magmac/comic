import { FETCHDATA } from './mutation-types'

export default {
  [FETCHDATA](state, payLoad) {
    state.cartoons = payLoad.data
  }
}
