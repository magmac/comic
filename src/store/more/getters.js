export default {
  cartoons: state =>
    state.cartoons.length
      ? state.cartoons.map(item => {
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
      : [],
  moreCartoons: state =>
    state.moreCartoons.length
      ? state.moreCartoons.map(item => {
          const { id, status, title, thumb } = item
          return {
            id,
            status,
            vertical: thumb,
            title
          }
        })
      : []
}
