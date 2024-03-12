const empty = {
  title: '',
  choiceId: 0,
  books: []
}

export default {
  historyBooks: state =>
    state.historyBooks
      ? state.historyBooks.map(item => {
          const { id, title, thumb, chapterId } = item
          return {
            id,
            vertical: thumb,
            title,
            chapterId
          }
        })
      : null,
  myBooks: state =>
    state.myBooks
      ? state.myBooks.map(item => {
          const { id, title, thumb } = item.bookInfo
          return {
            id,
            vertical: thumb,
            title
          }
        })
      : null,
  likeBooks: state =>
    state.likeBooks[44]
      ? {
          title: '猜你喜欢',
          choiceId: 44,
          books: state.likeBooks[44].list.map(item => {
            const { id, status, title, bookcover } = item
            return {
              id,
              status,
              vertical: bookcover,
              title
            }
          })
        }
      : empty
}
