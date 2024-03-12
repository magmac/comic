import actions from './actions'
import mutations from './mutations'

export const defaultState = {
  videos: [],
  keywords: []
}

export default {
  namespaced: true,
  state: defaultState,
  actions,
  mutations
}
