import actions from './actions'
import mutations from './mutations'

import player from './player'
import tag from './tag'
import myVideo from './myVideo'
import search from './search'
import ranking from './ranking'

export const defaultState = {
  videos: [],
  videoLinkid: null,
  preview: {}
}

export default {
  namespaced: true,
  state: defaultState,
  actions,
  mutations,
  modules: {
    player,
    tag,
    myVideo,
    search,
    ranking
  }
}
