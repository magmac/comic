import { CARTOONS, BULLETINPOPUP, BULLETINDATE, GIFTINFO, TOGGLELOADING } from './mutation-types'

export default {
  [CARTOONS](state, payLoad) {
    state.cartoons = Object.assign(state.cartoons, payLoad.data)
  },
  [BULLETINPOPUP](state, payLoad) {
    state.bulletinInfo = payLoad.data
  },
  [BULLETINDATE](state, payLoad) {
    state.dateToHomePopupShow = payLoad.data
  },
  [GIFTINFO](state, payLoad) {
    state.giftInfo = payLoad.data
  },
  [TOGGLELOADING](state, payLoad) {
    state.receiveGiftLoading = payLoad.status
  }
}
