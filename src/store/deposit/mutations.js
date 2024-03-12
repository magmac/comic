import { FETCHDATA } from './mutation-types'

export default {
  [FETCHDATA](state, payLoad) {
    state.species = payLoad.data
  }
}
