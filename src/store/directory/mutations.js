import { FETCHDATA, CHAPTERS, TOGGLEMYBOOK } from './mutation-types'

export default {
  [FETCHDATA](state, payLoad) {
    state.info = payLoad.cartoonInfoData
    state.catalog = payLoad.directoryData
    state.lastRead = payLoad.lastReadData
  },
  [CHAPTERS](state, payLoad) {
    state.catalog = payLoad.data
  },
  [TOGGLEMYBOOK](state, payLoad) {
    state.hasMyBook = payLoad.data
  }
}
