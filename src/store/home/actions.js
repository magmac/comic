import { format } from 'date-fns'
import { ElMessage } from 'element-plus'
import { getRecommendCartoons, homeToBulletin, userGiftInfo, receiveUserGift } from '/@/api'
import { CARTOONS, BULLETINPOPUP, BULLETINDATE, GIFTINFO, TOGGLELOADING } from './mutation-types'

const cartoonIds = '1,2,3,4,10,44'
// 1 banner, 2 精品荟萃 essence, 3 新书推荐 news, 10 人气推荐 popular , 44 猜你喜欢 likes
export default {
  async fetchCartoons({ commit }) {
    const data = await getRecommendCartoons({ ids: cartoonIds })
    commit({
      type: CARTOONS,
      data
    })
  },

  async getBulletinPopup({ commit, dispatch }) {
    const data = await homeToBulletin()
    if (data === null) return dispatch('home/updateBulletinDate')
    commit({
      type: BULLETINPOPUP,
      data
    })
  },

  updateBulletinDate({ commit }) {
    const today = format(new Date(), 'yyyyMMdd')
    commit({
      type: BULLETINDATE,
      data: today
    })
  },

  async getGiftInfo({ commit }) {
    const data = await userGiftInfo()
    commit({
      type: GIFTINFO,
      data
    })
  },

  async receive({ commit, dispatch }, params) {
    commit({ type: TOGGLELOADING, status: true })
    const data = await receiveUserGift(params)
    if (data.status) {
      await dispatch('getGiftInfo')
    }
    commit({ type: TOGGLELOADING, status: false })
    ElMessage({
      showClose: true,
      message: data.msg,
      type: data.status ? 'success' : 'error'
    })
  }
}
