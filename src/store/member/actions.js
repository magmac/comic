import { getCooperateList } from '/@/api'
import { FETCHDATA } from './mutation-types'

export default {
  async fetchData({ commit }) {
    const data = await getCooperateList()
    commit({
      type: FETCHDATA,
      data
    })
  }
}
