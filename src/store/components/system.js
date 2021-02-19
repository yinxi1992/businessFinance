/**
 * 动态添加菜单
 */
const addMenus = {
  state: {
    menuList: [],
    addActiveIndex: ""
  },
  mutations: {
    add_Menus(state, param) {
      if (param) {
        state.menuList = param
      }
    },
    addActiveIndex(state, param) {
      if (param) {
        state.addActiveIndex = param
      }
    }
  },
  actions: {
    add_Menus({ commit }, param) {
      commit('add_Menus', param)
    },
    addActiveIndex({
      commit
    }, param) {
      commit('addActiveIndex', param)
    },
  }
}
export default addMenus
