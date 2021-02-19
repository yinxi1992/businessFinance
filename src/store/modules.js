import addUserInfo_store from './components/userInfo.js'
import addSystem_store from './components/system.js'
import theme_store from "./components/theme.js"
import report_store from "./components/report.js"

export default {
    user: addUserInfo_store,
    system: addSystem_store,
    theme: theme_store,
    report: report_store
}