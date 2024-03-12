import { getPayMenu, getPayMenuTest as apiGetPayMenuTest } from '/@/api'
import { FETCHDATA } from './mutation-types'

export default {
  async fetchData({ commit }) {
    const data = await getPayMenu({ app: 1 })
    commit({
      type: FETCHDATA,
      data
    })
  },

  async getPayMenuTest({ commit, state }) {
    const { species } = state
    const res = await apiGetPayMenuTest({ app: 1 })
    const concatData = species.concat(res)
    commit({
      type: FETCHDATA,
      data: concatData
    })
  }
}
