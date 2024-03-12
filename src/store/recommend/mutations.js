import { INFO } from './mutation-types'

export default {
  [INFO](state, payLoad) {
    state.info = payLoad.data
  }
}
