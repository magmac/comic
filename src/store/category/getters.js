export default {
  cartoons: state =>
    state.cartoons
      ? state.cartoons.map(item => {
          const { id, status, title, description, tid, typename, author, thumb } = item
          return {
            id,
            status,
            vertical: thumb,
            title,
            description,
            tid,
            typename,
            author
          }
        })
      : null
}
