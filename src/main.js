// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueDND from 'awe-dnd'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/blackTheme.scss'
import './assets/css/common.css'
import echarts from 'echarts'
import 'echarts-liquidfill';
import * as THREE from "three";
import { WEBGL } from "three/examples/jsm/WebGL.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer"

Vue.prototype.$echarts = echarts
Vue.prototype.$THREE = THREE;
Vue.prototype.$WEBGL = WEBGL;
Vue.prototype.$FBXLoader = FBXLoader;
Vue.prototype.$OrbitControls = OrbitControls;
Vue.prototype.$CSS2DRenderer = CSS2DRenderer;
Vue.prototype.$CSS2DObject = CSS2DObject;

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueDND)

// 定义全局filter
Vue.filter('numberFormat', function (num) {
  // 为数字每三位加逗号分隔
  if (typeof num != "number" || num / 1000 < 1) {
    return num;
  } else {
    num = num + "";
    let arr = num.split("");
    arr.reverse();
    let tempArr = [];
    arr.forEach((item, index) => {
      tempArr.push(item);
      if (index % 3 == 2 && index != arr.length - 1) {
        tempArr.push(",");
      }
    });
    tempArr = tempArr.reverse();
    num = "";
    tempArr.forEach(item => {
      num += item;
    });
    return num;
  }
})

// 监听localstorage的方法
Vue.prototype.$addStorageEvent = function (type, key, data) {
  if (type === 1) {
    // 创建一个StorageEvent事件
    let newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        localStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    }
    return storage.setItem(key, data);
  } else {
    // 创建一个StorageEvent事件
    let newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        sessionStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    }
    return storage.setItem(key, data);
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data() {
    return {
      THEME_NAME: 'dark'
    }
  },
  router,
  store,  // 使用vuex
  components: {
    App
  },
  template: '<App/>',
  mounted() {
    if (window.localStorage.getItem("YH_BF_THEME")) {
      this.THEME_NAME = window.localStorage.getItem("YH_BF_THEME").replace("theme-", "");
    };
    window.addEventListener("setItem", e => {
      this.THEME_NAME = e.newValue.replace("theme-", "");
    });
  }
})
