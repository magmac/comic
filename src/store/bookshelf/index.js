import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export const defaultState = {
  likeBooks: [],
  historyBooks: null,
  myBooks: null
}

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
}
