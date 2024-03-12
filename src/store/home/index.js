import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export const defaultState = {
  cartoons: {},
  dateToHomePopupShow: null,
  bulletinInfo: {},
  giftInfo: {},
  receiveGiftLoading: false
}

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
}
