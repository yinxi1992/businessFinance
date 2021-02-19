/**
 * 缓存菜单信息
 * 
 */
const addUserInfo = {
  state: {
    permissionArr: [],
    ip: "",
    port: "",
    pwd: "",
    userName: "",
    userId: "",
    videoOffTime:null,
  },
  mutations: {
    add_UserInfo(state, param) {
      if (param) {
        state.permissionArr = param.permissionStr.split(',');
        state.videoOffTime = param.userMain.videoOffTime;
      }
    },
    add_ip(state, param) {
      if (param) {
        state.ip = param.transferIp;
        state.port = param.port;
        state.pwd = param.password;
        state.userName = param.userName;
        state.userId = param.userId;
      }
    },
    clear_user(state, param) {
      state.permissionArr = []
      state.ip = '';
      state.port = '';
      state.pwd = '';
      state.userName = '';
      state.userId = '';
      state.videoOffTime = null;
    },
  },
  actions: {
    add_UserInfo({
      commit
    }, param) {
      commit('add_UserInfo', param)
    },
    add_ip({
      commit
    }, param) {
      commit('add_ip', param)
    },
    add_port({
      commit
    }, param) {
      commit('add_port', param)
    },
    clear_user({
      commit
    }, param) {
      commit('clear_user', param)
    },
  }
}
export default addUserInfo
