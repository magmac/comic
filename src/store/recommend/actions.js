import { ElMessage, ElMessageBox } from 'element-plus'
import { myRecommendInfo, addRecommendId } from '/@/api'
import { INFO } from './mutation-types'

export default {
  async recommendInfo({ commit }) {
    const data = await myRecommendInfo()
    commit({
      type: INFO,
      data
    })
  },

  async addRecommendId({ commit }, id) {
    const data = await addRecommendId({ recommendcode: id })
    const { parentUid, errmsg } = data
    if (parentUid === -1) {
      return ElMessage({
        message: errmsg,
        type: 'error'
      })
    } else {
      ElMessageBox({
        type: 'success',
        message: '新增成功'
      })
      commit({
        type: INFO,
        data
      })
    }
  }
}
