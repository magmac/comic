import actions from './actions'
import mutations from './mutations'

export const defaultState = {
  detail: {},
  likes: []
}

export default {
  namespaced: true,
  state: defaultState,
  actions,
  mutations
}
