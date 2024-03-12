import { FETCHDATA, CARTOONS, CLEAR_DATA } from './mutation-types'

export default {
  [FETCHDATA](state, payLoad) {
    state.categories = payLoad.categoriesData
    state.cartoons = payLoad.cartoonsData
  },
  [CARTOONS](state, payLoad) {
    state.cartoons = payLoad.data
  },
  [CLEAR_DATA](state) {
    state.cartoons = []
  }
}
