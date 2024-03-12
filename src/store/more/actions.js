import { getRecommendCartoons, getMoreCartoons } from '/@/api'
import { FETCHDATA, MORE_CARTS, CLEAR_DATA } from './mutation-types'

const moreParams = {
  lang: 1,
  sortField: 'rate_order',
  sort: 1
}
export default {
  async fetchData({ commit, rootState, dispatch }, id) {
    const { pagesize } = rootState
    dispatch('toggleLoading', true, { root: true })
    await Promise.all([
      getRecommendCartoons({ ids: id }),
      getMoreCartoons(Object.assign(moreParams, { num: pagesize, page: 1 }))
    ]).then(datas => {
      const [cartoonsData, moreCartoonsData] = datas
      const newCartoonsData = cartoonsData[id] ? cartoonsData[id].list : {}
      commit({
        type: FETCHDATA,
        cartoonsData: newCartoonsData,
        moreCartoonsData
      })
    })
    dispatch('toggleLoading', false, { root: true })
  },

  async moreCartoons({ commit, state, rootState }, page) {
    const { pagesize } = rootState
    const { moreCartoons } = state
    const res = await getMoreCartoons(Object.assign(moreParams, { num: pagesize, page }))
    const data = moreCartoons.concat(res)
    commit({
      type: MORE_CARTS,
      data
    })
  },

  clearData({ commit }) {
    commit({
      type: CLEAR_DATA
    })
  }
}
