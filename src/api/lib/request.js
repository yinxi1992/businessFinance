//request.js
import axios from "axios";
import Config from '../static/config';
import {
  Message,
  Loading
} from 'element-ui'

let baseURL = '';
let serverLoading;
if (process.env.NODE_ENV === 'production') {
  baseURL = Config.proUrl;
} else {
  baseURL = Config.devtUrl;
}
/****** 创建axios实例 ******/
const service = axios.create({
  baseURL: baseURL, // api的base_url
  timeout: 20000 // 请求超时时间
});
/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {
  // 当请求数据收集接口时,修改请求URL
  if (config.url.indexOf("/v1/") != -1) {
    config.baseURL = Config.dataCollectionUrl
  }
  // 请求数据看板接口时不需要loading
  if (config.url != "/query/dataBoard") {
    serverLoading = Loading.service({
      text: "加载数据中....",
      lock: true,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      fullscreen: true
    });
  }

  config.headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': 'APPCODE 7236f73ec1d7409aa7546f004c2597d8'
  }

  config.method === 'post' ?
    config.data = JSON.stringify({
      ...config.data
    }) :
    config.params = {
      ...config.data
    }
  //config.data = JSON.stringify(config.data)
  // config.headers['Content-Type'] = (config.method === 'post' ? `application/json;charset=UTF-8` : `application/x-www-form-urlencoded`);
  return config;
}, error => { //请求错误处理
  serverLoading.close();
  console.log(error, "error");
  Message.error({
    message: "服务器开小差啦~"
  });
  Promise.reject("请求超时")
});
/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  response => { //成功请求到数据
    if (response.config.url.indexOf("/query/dataBoard") == -1) {
      serverLoading.close();
    }
    //这里根据后端提供的数据进行对应的处理
    if (response.headers.authorization) {
      sessionStorage.setItem('username', response.config.params.username)
      // 登录时候特殊处理
      Message.success({
        message: "登录成功！"
      });
      return Promise.resolve(response)
    } else {
      if (response.data.statusCode === -1) {
        Message.error({
          message: response.data.msg
        });
        return Promise.reject(response.data)
      } else if (response.data.statusCode === 0) {
        return Promise.resolve(response.data);
      } else if (response.data.statusCode === 1001) {
        return Promise.resolve(response.data);
      } else if (response.data.success) {
        return Promise.resolve(response.data);
      } else if (response.data.statusCode === 200) {
        return Promise.resolve(response.data);
      } else if (response.data.statusCode === 1024) {
        Message.error({
          message: response.data.msg
        });
      }
    }

  },
  error => { //响应错误处理
    if (error.config.url.indexOf("/query/dataBoard") == -1) {
      serverLoading.close();
    }
    if (error.request.responseURL.indexOf('login') >= 0) {
      Message.error({
        message: "请输入正确的账号和密码！"
      });
      sessionStorage.removeItem("token");
    } else {
      Message.error({
        message: "请求超时"
      });
    }
    return Promise.reject(error)
  }
);
export default service;
