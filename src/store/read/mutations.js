import { FETCHDATA, CLEARDATA, CLEARIMAGES, TOGGLEMYBOOK } from './mutation-types'

export default {
  [FETCHDATA](state, payLoad) {
    state.chapters = payLoad.data
    state.needPay = payLoad.needPay
  },
  [CLEARDATA](state) {
    state.chapters = {}
  },
  [CLEARIMAGES](state) {
    state.chapters.image = []
  },
  [TOGGLEMYBOOK](state, payLoad) {
    state.hasMyBook = payLoad.data
  }
}
