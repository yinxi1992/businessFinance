/**
 * 动态改变皮肤主题
 */
const changeTheme = {
  state: {
    theme: 'theme-dark' // theme-light
  },
  mutations: {
    changeTheme(state, param) {
      if (param) {
        state.theme = param
      }
    },
  },
  actions: {
    changeTheme({ commit }, param) {
      commit('changeTheme', param)
    },
  }
}
export default changeTheme
