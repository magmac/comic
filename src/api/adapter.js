import qs from 'qs'
import { MD5 } from 'crypto-js'

const adapter = (params, wantEncode) => {
  const key = 'Cartoon$2019&#'
  const timestamp = Date.parse(new Date()).toString().substr(0, 13)
  const newParams = { ...params, timestamp }
  const resultParams = Object.keys(newParams)
    .sort()
    .reduce((obj, k) => {
      obj[k] = wantEncode ? encodeURI(newParams[k]) : newParams[k]
      return obj
    }, {})
  const sign = MD5(qs.stringify({ ...resultParams, key }, { encode: false }))
    .toString()
    .toUpperCase()
  return {
    timestamp,
    sign
  }
}

export default adapter
