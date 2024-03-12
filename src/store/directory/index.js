import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export const defaultState = {
  info: {},
  catalog: {
    cChapterList: [],
    count: '--',
    lastRead: {},
    hasMyBook: false
  }
}

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
}
