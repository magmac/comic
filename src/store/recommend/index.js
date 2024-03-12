import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export const defaultState = {
  info: {}
}

export default {
  namespaced: true,
  state: defaultState,
  actions,
  getters,
  mutations
}
