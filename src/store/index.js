import modules from './modules'
import VuexPersistence from 'vuex-persist';
import Vuex from 'vuex'
import Vue from 'vue'

 Vue.use(Vuex)


const vuexLocal = new VuexPersistence({
    storage: window.localStorage
}) 

const store = new Vuex.Store({
    modules: modules,
    plugins: [vuexLocal.plugin]
})
export default store;
