import router from '/@/router'
import {
  autoLogin,
  userLogin,
  register,
  getDomain,
  getUserInfo,
  getHigh,
  getCartoonLastRead,
  getVideoImgDomain,
  resetPassword,
  retrieveUser,
  getBackBooks,
  getAdList,
  videoMaintainList,
  checkDomain
} from '/@/api'
import { ElMessageBox } from 'element-plus'
import {
  INIT,
  USERINFO as USER_INFO,
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

const createToken = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  for (let i = 0; i < 32; i++) uuid.push(chars[0 | (Math.random() * 62)])
  return uuid.join('')
}

export default {
  async init({ getters, commit }, params) {
    const { linkid, platform, recommend, queryToken } = params
    const { hasToken } = getters
    const loginParams = recommend ? { linkid, recommend } : { linkid }
    commit({
      type: SETINIT,
      linkid,
      platform
    })

    if (queryToken) {
      commit({
        type: SETTOKEN,
        token: queryToken
      })
    } else {
      if (!hasToken) {
        const token = createToken()
        commit({
          type: SETTOKEN,
          token
        })
      }
    }

    await Promise.all([
      getDomain({ type: 8 }),
      getDomain({ type: 99 }),
      autoLogin(loginParams),
      getBackBooks(),
      getAdList(),
      videoMaintainList({ platform: 1 })
      // checkDomain()
    ]).then(datas => {
      const [imgDomainData, domainListData, loginData, backData, adData, vMaintainData] = datas
      const [{ domain: imgDomainUrl }] = imgDomainData
      const [{ domain: domainListUrl }] = domainListData
      const { servertoken: token, istemp, tname } = loginData
      const authData = { token, istemp, tname }
      const {
        backUrls: { info: ids }
      } = backData
      // if (redirectUrl) {
      //   return commit({
      //     type: REDIRECTURL,
      //     data: redirectUrl
      //   })
      // }
      commit({
        type: INIT,
        domain: window.location.origin,
        imgDomain: imgDomainUrl,
        urlListDomain: domainListUrl,
        authData,
        ids,
        adData,
        vMaintainData
      })
    })
    commit(INITLOADING)
    // 最後取 video img domain
    const videoImgDomainData = await getVideoImgDomain({ typeString: 20 })
    const videoImgDomainUrl = videoImgDomainData ? videoImgDomainData['20'][0].domain : ''
    commit({
      type: VIDEOIMGDOMAIN,
      videoImgDomain: videoImgDomainUrl
    })
  },

  async userSignin({ commit }, user) {
    const { phone } = user
    const data = await userLogin(user)
    if (!data) {
      commit({
        type: SETAUTHDATA,
        data: { token: phone, istemp: 0 }
      })
      ElMessageBox({
        type: 'success',
        message: '登录成功',
        callback: () => {
          router.push({
            path: '/member'
          })
        }
      })
    }
  },

  async register({ commit }, params) {
    const { phone } = params
    const {
      query: { from }
    } = router.currentRoute.value
    const data = await register(params)

    if (!data) {
      commit({
        type: SETAUTHDATA,
        data: { token: phone, istemp: 0 }
      })
      ElMessageBox({
        type: 'success',
        message: '注册成功',
        callback: () => {
          router.push({
            path: from ? from : '/member'
          })
        }
      })
    }
  },

  async changePassword(action, params) {
    const data = await resetPassword(params)
    if (data) {
      ElMessageBox({
        message: data,
        callback: () => {
          router.push({
            path: '/member'
          })
        }
      })
    }
  },

  async fetchUserInfo({ commit }) {
    const data = await getUserInfo()
    commit({
      type: USER_INFO,
      data
    })
  },

  // choiceId 為高爆庫類別 id
  async handleHigh(action, { choiceId, bookId }) {
    const highRes = await getHigh({ id: choiceId, bookId })
    if (highRes) {
      const { id: startBookId } = highRes
      const res = await getCartoonLastRead({ bookId: startBookId })
      if (res) {
        router.push({ path: `/read/${res.id}` })
      }
    }
  },

  toggleLoading({ commit }, status) {
    commit({
      type: LOADING,
      status
    })
  },

  async orderToRetrieveUser({ commit, rootState }, data) {
    const res = await retrieveUser(data)
    if (res) {
      const { temp, uid } = res
      if (temp === 1) {
        commit({
          type: SETAUTHDATA,
          data: { token: uid, istemp: temp }
        })
        ElMessageBox({
          type: 'success',
          message: '成功找回用户',
          callback: () => {
            router.push({
              path: '/member'
            })
          }
        })
      } else {
        const {
          auth: { istemp }
        } = rootState
        if (istemp) {
          ElMessageBox.confirm(`您的账号为: <b>${uid}</b>`, '成功找回用户', {
            type: 'info',
            dangerouslyUseHTMLString: true,
            cancelButtonText: '稍后在说',
            confirmButtonText: '立即登录'
          }).then(() => {
            router.push({
              path: '/login'
            })
          })
        } else {
          ElMessageBox({
            message: `您的账号为: <b>${uid}</b>`,
            dangerouslyUseHTMLString: true
          })
        }
      }
    }
  },

  setComebackCount({ commit }, count) {
    commit({ type: COMEBACKCOUNT, count })
  },

  toggleBackStart({ commit }, value) {
    commit({ type: TOGGLEBACKSTART, value })
  }
}
