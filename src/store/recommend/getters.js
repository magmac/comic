export default {
  hasRecharge: (state, getters, rootState) => {
    const {
      userInfo: { isRecharge }
    } = rootState
    return !!isRecharge
  }
}
