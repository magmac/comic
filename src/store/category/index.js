import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export const defaultState = {
  categories: [],
  cartoons: [],
  choiceId: 44
}

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
}
