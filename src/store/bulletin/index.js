import actions from './actions'
import mutations from './mutations'

export const defaultState = {
  list: [],
  detail: {}
}

export default {
  namespaced: true,
  state: defaultState,
  actions,
  mutations
}
