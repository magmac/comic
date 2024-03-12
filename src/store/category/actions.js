import { getCategory, getCartoons } from '/@/api'
import { FETCHDATA, CARTOONS, CLEAR_DATA } from './mutation-types'

export default {
  async fetchData({ commit, rootState, dispatch }) {
    const { pagesize } = rootState
    const categoryParams = {
      lang: 1,
      sort: 0
    }
    const cartoonsParams = {
      typeId: 0,
      sexy: 0,
      status: 0,
      pagesize,
      page: 1
    }
    dispatch('toggleLoading', true, { root: true })
    await Promise.all([getCategory(categoryParams), getCartoons(cartoonsParams)]).then(datas => {
      const [categoriesData, cartoonsData] = datas
      commit({
        type: FETCHDATA,
        categoriesData,
        cartoonsData
      })
    })
    dispatch('toggleLoading', false, { root: true })
  },

  async cartoons({ commit, state, rootState, dispatch }, params) {
    const { page } = params
    const { cartoons } = state
    const { pagesize } = rootState
    if (page === 1) {
      dispatch('toggleLoading', true, { root: true })
      commit({
        type: CARTOONS,
        data: []
      })
    }
    const res = await getCartoons(Object.assign(params, { pagesize }))
    const data = page > 1 ? cartoons.concat(res) : res
    dispatch('toggleLoading', false, { root: true })
    commit({
      type: CARTOONS,
      data
    })
  },

  clearData({ commit }) {
    commit({
      type: CLEAR_DATA
    })
  }
}
