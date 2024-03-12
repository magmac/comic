import { tradeRecord } from '/@/api'
import { FETCHDATA } from './mutation-types'

export default {
  async fetchData({ commit, state, rootState }, page) {
    const { info } = state
    const { pagesize } = rootState
    const data = await tradeRecord({ page, pagesize })
    if (page !== 1) Object.assign(data.list, info.list.concat(data.list))
    commit({
      type: FETCHDATA,
      data
    })
  }
}
