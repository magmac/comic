export default {
  images: state => state.chapters.image,
  prevId: state => state.chapters.previd,
  nextId: state => state.chapters.nextid,
  bookId: state => (state.chapters.book ? state.chapters.book.id : 0),
  title: state => (state.chapters.book ? state.chapters.book.title : '')
}
