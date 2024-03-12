import { createStore, createLogger } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
const { MODE } = import.meta.env

import home from './home'
import category from './category'
import bulletin from './bulletin'
import deposit from './deposit'
import read from './read'
import more from './more'
import bookshelf from './bookshelf'
import directory from './directory'
import search from './search'
import download from './download'
import recommend from './recommend'
import record from './record'
import video from './video'
import member from './member'

export const defaultState = {
  auth: {
    token: null,
    linkid: 0,
    istemp: null,
    tname: null,
    platform: 'wap'
  },
  domain: '',
  imgDomain: '',
  videoImgDomain: '',
  urlListDomain: '',
  videoMaintainList: [],
  pagesize: 20,
  userInfo: {},
  typeColors: ['#313131', '#008D00', '#008D00', '#9C00C9', '#0080FF', '#FF1692', '#8E8500', '#FF8811'],
  loading: false, // api get data loading
  isAppInitialComplete: false, // initial loading
  backBooks: [],
  comebackCount: 0,
  ads: [],
  redirectUrl: '',
  isBackStart: false
}

const ls = new SecureLS({
  encodingType: 'aes',
  isCompression: false,
  encryptionSecret: 'jhkey'
})

const createPersisted = createPersistedState({
  key: 'comics',
  storage:
    MODE !== 'development'
      ? {
          getItem: key => ls.get(key),
          setItem: (key, value) => ls.set(key, value),
          removeItem: key => ls.remove(key)
        }
      : window.localStorage,
  reducer(val) {
    const {
      auth,
      home: { dateToHomePopupShow },
      comebackCount
    } = val
    return {
      auth,
      home: { dateToHomePopupShow },
      comebackCount
    }
  }
})

const plugins = MODE !== 'development' ? [createPersisted] : [createPersisted, createLogger()]

export default createStore({
  state: defaultState,
  actions,
  mutations,
  getters,
  modules: {
    home,
    category,
    bulletin,
    deposit,
    read,
    more,
    bookshelf,
    directory,
    search,
    download,
    recommend,
    record,
    video,
    member
  },
  plugins
})
