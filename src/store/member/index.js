import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export const defaultState = {
  cooperate: []
}

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
}
