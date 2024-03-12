export default {
  chapters: state => (Object.keys(state.catalog.cChapterList).length ? state.catalog.cChapterList : []),
  lastReadChapter: state => (Object.keys(state.lastRead).length ? state.lastRead.name : ''),
  lastReadChapterId: state => (Object.keys(state.lastRead).length ? state.lastRead.id : 0),
  firstChapterId: state => (Object.keys(state.catalog.cChapterList).length ? state.catalog.cChapterList[0].id : 0)
}
