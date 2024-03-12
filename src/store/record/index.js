import actions from './actions'
import getters from './getters'
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
