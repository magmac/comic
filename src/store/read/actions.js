import { getChapter, join, operatingMyCartoon } from '/@/api'
import { useRoute } from 'vue-router'
import { FETCHDATA, CLEARDATA, TOGGLEMYBOOK, CLEARIMAGES } from './mutation-types'

async function chapter(commit, id) {
  const data = await getChapter({ chapterId: id, app: 1 })
  if (data) {
    const storeData = data.length ? data[0] : data
    const needPay = !data.length
    if (needPay) {
      Object.assign(storeData, { image: storeData.image.splice(0, 3) })
    } else {
      join({ bookId: storeData.bookid, chapterId: id })
    }
    commit({
      type: FETCHDATA,
      data: storeData,
      needPay
    })
    const { book } = storeData
    document.title = book.title
    return storeData
  }
  return data
}

export default {
  async fetchData({ commit, dispatch, state, rootState }) {
    const route = useRoute()
    const { chapterId } = route.params
    const data = await chapter(commit, chapterId)
    if (data) {
      // 加入書架處理
      await dispatch('bookshelf/fetchMyCartoons', null, { root: true })
      const mybook = rootState.bookshelf.myBooks.find(item => item.bookid === state.chapters.book.id)
      commit({
        type: TOGGLEMYBOOK,
        data: !!mybook
      })
    }
    dispatch('fetchUserInfo', null, { root: true })
  },

  async fetchChapter({ commit, dispatch }, id) {
    commit({
      type: CLEARIMAGES
    })
    await chapter(commit, id)
    dispatch('fetchUserInfo', null, { root: true })
  },

  clearData({ commit }) {
    commit({
      type: CLEARDATA
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
