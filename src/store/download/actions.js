import { download } from '/@/api'

export default {
  async downloadInfo({ rootState }, rechargeFlag) {
    const {
      auth: { linkid }
    } = rootState
    const data = await download({
      platform: 1,
      linkid,
      rechargeFlag
    })
    window.location = data.url
  }
}
