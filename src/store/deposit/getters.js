export default {
  normal: state => (state.species ? state.species.filter(item => item.isVip === 1) : []),
  vip: state => (state.species ? state.species.filter(item => item.isVip === 2 || item.isVip === 3) : []),
  day: state => (state.species ? state.species.filter(item => item.isVip === 5) : [])
}
