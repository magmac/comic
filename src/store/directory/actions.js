import { useRoute } from 'vue-router'
import { getDirectory, getCartoonInfo, getCartoonLastRead, operatingMyCartoon } from '/@/api'
import { FETCHDATA, CHAPTERS, TOGGLEMYBOOK } from './mutation-types'

export default {
  async fetchData({ commit, dispatch, rootState }) {
    const route = useRoute()
    const { id } = route.params
    const { pagesize } = rootState
    Promise.all([
      getDirectory({ cartoonId: id, sort: 0, pagesize }),
      getCartoonInfo({ cartoonId: id }),
      getCartoonLastRead({ bookId: id })
    ]).then(datas => {
      const [directoryData, cartoonInfoData, lastReadData] = datas
      commit({
        type: FETCHDATA,
        cartoonInfoData,
        directoryData,
        lastReadData
      })
    })
    // 收藏書架處理
    await dispatch('bookshelf/fetchMyCartoons', null, { root: true })
    const mybook = rootState.bookshelf.myBooks.find(item => item.bookid === (id | 0))
    commit({
      type: TOGGLEMYBOOK,
      data: !!mybook
    })
  },

  async chapters({ commit, state, rootState }, params) {
    const { pagesize } = rootState
    const { catalog } = state
    const res = await getDirectory(Object.assign(params, { sort: 0, pagesize }))
    const data = catalog
    if (res) data.cChapterList = data.cChapterList.concat(res.cChapterList)
    commit({
      type: CHAPTERS,
      data
    })
  },

  async toggleMyBook({ commit }, bookid) {
    const data = await operatingMyCartoon({ bookid })
    commit({
      type: TOGGLEMYBOOK,
      data: !data
    })
  }
}
