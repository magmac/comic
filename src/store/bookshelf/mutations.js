import {
  FETCHDATA,
  HISTORY,
  MY_BOOKS,
  DELE_MY_BOOKS,
  DELE_HISTORY_BOOKS,
  DELE_ALL_HISTORY_BOOKS
} from './mutation-types'

export default {
  [FETCHDATA](state, payLoad) {
    state.likeBooks = payLoad.data
  },
  [HISTORY](state, payLoad) {
    state.historyBooks = payLoad.data
  },
  [MY_BOOKS](state, payLoad) {
    state.myBooks = payLoad.data
  },
  [DELE_MY_BOOKS](state, payLoad) {
    state.myBooks.splice(payLoad.index, 1)
  },
  [DELE_HISTORY_BOOKS](state, payLoad) {
    state.historyBooks.splice(payLoad.index, 1)
  },
  [DELE_ALL_HISTORY_BOOKS](state, payLoad) {
    state.historyBooks = []
  }
}
