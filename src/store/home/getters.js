import { format } from 'date-fns'

const empty = {
  title: '',
  choiceId: 0,
  books: []
}

export default {
  hasCartoons: state => {
    return !!Object.keys(state.cartoons).length
  },
  banner: state => {
    return state.cartoons[1]
      ? {
          title: 'banner',
          choiceId: 1,
          books: state.cartoons[1].list.map(item => {
            const { id, thumb } = item
            return {
              id,
              horizontal: thumb
            }
          })
        }
      : empty
  },

  essence: state =>
    state.cartoons[2]
      ? {
          title: '精品荟萃',
          choiceId: 2,
          books: state.cartoons[2].list
            .sort(() => Math.random() - 0.5)
            .slice(0, 6)
            .map(item => {
              const { id, status, title, bookcover } = item
              return {
                id,
                status,
                vertical: bookcover,
                title
              }
            })
        }
      : empty,

  news: state =>
    state.cartoons[3]
      ? {
          title: '新书推荐',
          choiceId: 3,
          books: state.cartoons[3].list.slice(0, 9).map(item => {
            const { id, status, title, bookcover } = item
            return {
              id,
              status,
              vertical: bookcover,
              title
            }
          })
        }
      : empty,

  popular: state =>
    state.cartoons[10]
      ? {
          title: '人气推荐',
          choiceId: 10,
          books: state.cartoons[10].list.slice(0, 3).map(item => {
            const { id, status, title, bookcover } = item
            return {
              id,
              status,
              vertical: bookcover,
              title
            }
          })
        }
      : empty,

  likes: state =>
    state.cartoons[44]
      ? {
          title: '猜你喜欢',
          choiceId: 44,
          books: state.cartoons[44].list.slice(0, 8).map(item => {
            const { id, status, title, desc, tid, typename, author, bookcover } = item
            return {
              id,
              status,
              vertical: bookcover,
              title,
              description: desc,
              tid,
              typename,
              author
            }
          })
        }
      : empty,

  bulletin: (state, getters, rootState) => {
    const { imgDomain } = rootState
    const { bulletinInfo } = state
    if (Object.keys(bulletinInfo).length && imgDomain) {
      const { id, imagePath } = bulletinInfo
      let path
      switch (id) {
        case 28:
          path = '/video'
          break
        default:
          path = null
          break
      }
      return {
        imagePath: imgDomain + imagePath.replace(/jpeg|jpg|png|gif/, 'html'),
        path
      }
    }
    return {}
  },

  showBulletinPopup: state => {
    const { dateToHomePopupShow } = state
    const today = format(new Date(), 'yyyyMMdd')
    return !(dateToHomePopupShow === today)
  }
}
