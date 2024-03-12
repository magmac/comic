import { search } from '/@/api'
import { FETCHDATA } from './mutation-types'

export default {
  async fetchData({ commit, state, rootState, dispatch }, params) {
    const { page } = params
    const { cartoons } = state
    const { pagesize } = rootState
    if (page === 1) dispatch('toggleLoading', true, { root: true })
    const res = await search(Object.assign(params, { pagesize }))
    if (page === 1) dispatch('toggleLoading', false, { root: true })
    const data = page === 1 ? res : cartoons.concat(res)
    commit({
      type: FETCHDATA,
      data
    })
  }
}
