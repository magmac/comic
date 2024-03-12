import { format } from 'date-fns'

export default {
  currentTotal: state => {
    const { info } = state
    return Object.keys(info).length ? info.list.length : 0
  },
  list: state => {
    const { info } = state
    if (Object.keys(info).length) {
      const result = []
      info.list.forEach(value => {
        const { time, bookBean: beans, chapeterName: chapter, name } = value
        const month = format(new Date(time), 'yyyy-MM')
        const day = format(new Date(time), 'dd')
        const item = { beans, chapter, name, day }
        if (result.length === 0 || result[result.length - 1].month !== month) {
          result.push({
            month,
            items: [item]
          })
        } else {
          result[result.length - 1].items.push(item)
        }
      })
      return result
    }
    return info.list
  }
}
