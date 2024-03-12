import actions from './actions'
import mutations from './mutations'

export const defaultState = {
  history: [],
  myVideos: []
}

export default {
  namespaced: true,
  state: defaultState,
  actions,
  mutations
}
