import axios from 'axios'
import qs from 'qs'
import adapter from './adapter'
import { MessageBox } from '/@/utils'
import { decrypt } from '/@/utils/decipher'
import router from '/@/router'
import store from '/@/store'

const OnceMessageBox = new MessageBox()
const { VITE_COMIC_API_BASE_URL, VITE_VIDEO_API_BASE_URL } = import.meta.env
const cartoonInstance = axios.create()
cartoonInstance.defaults.baseURL = `${VITE_COMIC_API_BASE_URL}/3/cartoon`
cartoonInstance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

const videoInstance = axios.create()
videoInstance.defaults.baseURL = VITE_VIDEO_API_BASE_URL
videoInstance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

// 請求攔截
const _requestInterceptors = instance => {
  instance.interceptors.request.use(
    config => {
      const { token } = store.state.auth
      config.headers['Access-Token'] = token
      const wantEncode = !(config.url === '/search') // 視頻 search api 不 encode
      Object.assign(config.headers, adapter(config.data, wantEncode))
      config.data = qs.stringify(config.data)
      return config
    },
    error => {
      console.log('request error: ', error)
      return Promise.reject(error)
    }
  )
}

_requestInterceptors(cartoonInstance)
_requestInterceptors(videoInstance)

// 響應攔截
const _responseInterceptors = instance => {
  instance.interceptors.response.use(
    response => {
      const { config } = response
      const {
        data: { code, msg, data }
      } = response
      const decodeData = data ? decrypt(data) : data
      switch (code) {
        case 0:
        case 1009: // 金币余额不足请充值
          return Promise.resolve(decodeData)
        case -1: // 未知错误
          // video player 書幣不足
          if (config.url === '/player') return Promise.resolve(decodeData)
          else {
            OnceMessageBox.warning(`${msg} (${code})`)
            break
          }
        case 3001: // 指定内容不存在
          if (config.url === '/dsp/list') return Promise.resolve()
          else {
            OnceMessageBox.warning(`${msg} (${code})`)
            break
          }
        case 4008: // 封鎖 帳號
        case 4009: // 封鎖 IP
          OnceMessageBox.warning({
            message: `${msg} (${code})`,
            confirmButtonText: '联系客服',
            closeOnClickModal: false,
            callback: () => {
              router.push({
                path: '/customer'
              })
            }
          })
          break
        default:
          OnceMessageBox.warning(`${msg} (${code})`)
          return Promise.reject(msg)
      }
    },
    error => {
      console.log('server error: ', error)
      return Promise.reject(error)
    }
  )
}

_responseInterceptors(cartoonInstance)
_responseInterceptors(videoInstance)

const _apiBase = (method, url, params) => {
  return method(url, params)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}

const get = (url, params) => {
  return _apiBase(cartoonInstance.get, url, params)
}

const post = (url, params) => {
  return _apiBase(cartoonInstance.post, url, params)
}

const videoGet = (url, params) => {
  return _apiBase(videoInstance.get, url, params)
}

const videoPost = (url, params) => {
  return _apiBase(videoInstance.post, url, params)
}

export { get, post, videoGet, videoPost }

/*
API error code
500: 服务器繁忙
501: 签名错误
502: 无效请求
503: 请求拒绝
1004: 手机号码已经被占用
1050: 未登陆
2000: 签名缺少必要参数
2001: 签名验证失效
2002: 应用不存在
2003: 获取accesstoken失败
3000: 缺少参数
3002: 操作失败

*/
