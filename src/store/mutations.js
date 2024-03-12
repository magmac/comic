import {
  INIT,
  USERINFO,
  LOADING,
  SETTOKEN,
  SETINIT,
  SETAUTHDATA,
  INITLOADING,
  COMEBACKCOUNT,
  VIDEOIMGDOMAIN,
  REDIRECTURL,
  TOGGLEBACKSTART
} from './mutation-types'

export default {
  [INIT](state, payLoad) {
    const { domain, imgDomain, urlListDomain, authData, ids, vMaintainData } = payLoad
    state.domain = domain
    state.imgDomain = imgDomain
    state.urlListDomain = urlListDomain
    state.auth = Object.assign(state.auth, authData)
    state.ads = payLoad.adData || {}
    state.backBooks = ids
    state.videoMaintainList = vMaintainData
  },

  [VIDEOIMGDOMAIN](state, payLoad) {
    state.videoImgDomain = payLoad.videoImgDomain
  },

  [USERINFO](state, payLoad) {
    state.userInfo = Object.assign(state.userInfo, payLoad.data)
  },

  [LOADING](state, payLoad) {
    state.loading = payLoad.status
  },

  [INITLOADING](state) {
    state.isAppInitialComplete = true
  },

  [SETTOKEN](state, payLoad) {
    state.auth = Object.assign(state.auth, { token: payLoad.token })
  },

  [SETAUTHDATA](state, payLoad) {
    state.auth = Object.assign(state.auth, payLoad.data)
  },

  [SETINIT](state, payLoad) {
    const { linkid, platform } = payLoad
    state.auth = Object.assign(state.auth, {
      linkid,
      platform
    })
  },

  [COMEBACKCOUNT](state, payLoad) {
    state.comebackCount = payLoad.count
  },

  [REDIRECTURL](state, payLoad) {
    state.redirectUrl = payLoad.data
  },

  [TOGGLEBACKSTART](state, payLoad) {
    state.isBackStart = payLoad.value
  }
}
