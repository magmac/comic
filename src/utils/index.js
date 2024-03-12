import { intervalToDuration } from 'date-fns'
import { ElMessageBox } from 'element-plus'
// 千位符
export const toThousands = num => {
  const numStr = (num || 0).toString()
  return numStr.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

// 總秒數 format 時分秒
export const formatSeconds = totalSeconds => {
  const duration = intervalToDuration({ start: 0, end: totalSeconds * 1000 })
  const { hours, minutes, seconds } = duration
  const mm = minutes < 10 ? '0' + minutes : minutes
  const ss = seconds < 10 ? '0' + seconds : seconds
  if (totalSeconds > 3600) return `${hours}:${mm}:${ss}`
  return `${mm}:${ss}`
}

// 計算百分比
export const percentage = (num, total) => {
  if (num === 0 || total === 0) {
    return 0
  }
  return Math.round((num / total) * 10000) / 100
}

// 廣告跳轉方式
export const adTarget = (another, url) => {
  another ? window.open(url) : (window.location.href = url)
}

// 轉 base64 圖片
export const getImageToBase64 = url =>
  new Promise(resolve => {
    fetch(url)
      .then(response => {
        return response.text()
      })
      .then(text => {
        resolve(text.replace(/\+/g, '*').replace(/\//g, '+').replace(/\*/g, '/').replace(/\*/g, '/'))
      })
      .catch(() => {
        resolve(null)
      })
  })

// 判斷是否 IOS
export const isIOS = () => {
  const u = navigator.userAgent
  const IOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  return IOS
}

// message 彈窗限制一次
const showMessage = Symbol('showMessage')
export const MessageBox = class MessageBox {
  success(options) {
    this[showMessage]('success', options)
  }
  warning(options) {
    this[showMessage]('warning', options)
  }
  info(options) {
    this[showMessage]('info', options)
  }
  error(options) {
    this[showMessage]('error', options)
  }
  alert(options) {
    this[showMessage]('error', options)
  }
  [showMessage](type, options) {
    if (
      document.getElementsByClassName('el-message-box').length === 0 ||
      document.getElementsByClassName('el-message-box__wrapper')[0].style.display == 'none'
    ) {
      ElMessageBox(options)
    }
  }
}
