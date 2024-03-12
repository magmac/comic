import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export const defaultState = {
  species: []
}

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
}
