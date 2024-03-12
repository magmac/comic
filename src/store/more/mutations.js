import { FETCHDATA, MORE_CARTS, CLEAR_DATA } from './mutation-types'

export default {
  [FETCHDATA](state, payLoad) {
    state.cartoons = payLoad.cartoonsData
    state.moreCartoons = payLoad.moreCartoonsData
  },
  [MORE_CARTS](state, payLoad) {
    state.moreCartoons = payLoad.data
  },
  [CLEAR_DATA](state) {
    state.cartoons = []
    state.moreCartoons = []
  }
}
