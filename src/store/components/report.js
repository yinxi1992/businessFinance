/**
 * 报表页面跳转
 */
const changeLink = {
  state: {
    link: null,
    details: null
  },
  mutations: {
    changeLink(state, param) {
      if (param) {
        state.link = param
      }
    },
    changeDetails(state, param) {
      if (param) {
        state.details = param
      }
    },
    changeDetailLevel(state, param) {
      if (param && state.details.currentLevel) {
        state.details.currentLevel = param
      }
    },
    changeTitle(state, param) {
      if (param && state.details.title) {
        state.details.title = param.title
        if (param.subtitle) {
          state.details.subtitle = param.subtitle
        }
      }
    },
    changeLevel1(state, param) {
      if (param) {
        state.details.level1 = param
      }
    },
    changeLevel2(state, param) {
      if (param) {
        state.details.level2 = param
      }
    },
    changeLevel3(state, param) {
      if (param) {
        state.details.level3 = param
      }
    }
  },
  actions: {
    changeLink({ commit }, param) {
      commit('changeLink', param)
    },
    changeDetails({ commit }, param) {
      commit('changeDetails', param)
    },
    changeDetailLevel({ commit }, param) {
      commit('changeDetailLevel', param)
    },
    changeTitle({ commit }, param) {
      commit('changeTitle', param)
    },
    changeLevel1({ commit }, param) {
      commit('changeLevel1', param)
    },
    changeLevel2({ commit }, param) {
      commit('changeLevel2', param)
    },
    changeLevel3({ commit }, param) {
      commit('changeLevel3', param)
    }
  }
}
export default changeLink
