export default {
  cooperate: state => (Object.keys(state.cooperate).length ? state.cooperate[0] : [])
}
