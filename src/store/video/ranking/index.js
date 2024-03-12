import actions from './actions'
import mutations from './mutations'

export const defaultState = {
  tags: [],
  videos: []
}

export default {
  namespaced: true,
  state: defaultState,
  actions,
  mutations
}
