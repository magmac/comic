import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const defaultState = {
  cartoons: []
}

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
}
