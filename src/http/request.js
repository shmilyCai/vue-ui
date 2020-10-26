
import axios from 'axios';
import VueCookies from 'vue-cookies'
import router from "../router";
import { message } from "element-ui"

import config from '@/config/index'

message.config({
  duration: 2,
  maxCount: 1
});

const host = window.location.host;
axios.defaults.timeout = 600000;

let devHostReg = /^(http?(s)?:\/\/)?((172\.24\.129\.)|(localhost))(.+)$/;//匹配开发环境的正则表达式
let testHostReg = /^(http?(s)?:\/\/)?((10\.100\.22\.))(.+)$/;//匹配10.100环境的正则表达式
// let prodHostReg = /^(http?(s)?:\/\/)?((i\.))(.+)$/;//匹配正式环境的正则表达式

let defaultUrl = "";

if (devHostReg.test(host)) {
  defaultUrl = "http://172.24.129.28:8080/";
} else if (testHostReg.test(host)) {
  defaultUrl = "http://" + host.split(":")[0] + ":9222/";
} else {
  defaultUrl = "http://" + host.split(":")[0] + ":9222/";
}

export function importUrl() {
  return defaultUrl
}

axios.interceptors.request.use(
  config => {
    let token;
    let login_type;
    let user_info;
    // if(!token){//没有token重定向到登录页
    //     location.href = "/login";
    // }

    config.data = JSON.stringify(config.data);
    config.url = defaultUrl + config.url;
    let login_status = config.url.search("login");
    if (login_status === -1) {

      let google_bind = config.url.search("verify_bind");
      let google_authentication = config.url.search("verify_authentication");
      let exchange_channel = config.url.search("exchange_channel");
      if (google_bind === -1 && google_authentication === -1 && exchange_channel === -1) {
        token = VueCookies.get('token');
        user_info = VueCookies.get('userInfo');
        if (user_info) {
          if (token) {
            config.headers = {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': token,
            }
          } else {
            VueCookies.remove('token');
            VueCookies.remove('userInfo');
            // message.warning('登录失效，请重新登录');
            router.push(
              {
                path: '/login',
                query: { redirect: router.currentRoute.fullPath }
              });
            // config.headers = {
            //     'Content-Type': 'application/json;charset=utf-8',
            //     token
            // }
          }
        } else {
          VueCookies.remove('token');
          VueCookies.remove('userInfo');
          // message.warning('登录失效，请重新登录');
          router.push(
            {
              path: '/login',
              query: { redirect: router.currentRoute.fullPath }
            });
        }
      } else {
        login_type = VueCookies.get('x-http-login');
        if (login_type) {
          config.headers = {
            'Content-Type': 'application/json;charset=utf-8',
            'X-HTTP-LOGIN': login_type
          }
        } else {
          VueCookies.remove('token');
          VueCookies.remove('userInfo');
          VueCookies.remove('x-http-login');
          // message.warning('登录失效，请重新登录');
          router.push(
            {
              path: '/login',
            });
        }
      }


    } else {
      config.headers = {
        'Content-Type': 'application/json'
      };
    }
    let { method, params } = config;
    if (method == "get") {
      if (params) {
        params.t = new Date().getTime();
      } else {
        params = {};
        params.t = new Date().getTime();
      }

    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data && response.headers["content-type"] === 'application/octet-stream') {//下载的流文件
        return Promise.resolve(response);
      } else {
        let data = response.data || {};
        if (data.code === 200) {
          return Promise.resolve(response);
        } else if (data.code === 401) {//token失效
          VueCookies.remove('token');
          VueCookies.remove('userInfo');
          VueCookies.remove('x-http-login');
          if (data.msg != '登录已失效，请重新登录' || data.message != '登录已失效，请重新登录') {
            message.destroy();
            message.warning(data.msg || data.message || '登录失效，请重新登录', 2);
          }
          router.push(
            {
              path: '/login',
              query: { redirect: router.currentRoute.fullPath }
            });
        } else {
          message.destroy();
          message.error(data.msg || data.message || "系统异常,请稍后重试", 2);
        }
      }

    } else if (response.status === 401) {
      VueCookies.remove('token');
      VueCookies.remove('userInfo');
      VueCookies.remove('x-http-login');
      message.destroy();
      message.warning('登录失效，请重新登录', 2);
      router.push(
        {
          path: '/login',
          query: { redirect: router.currentRoute.fullPath }
        });
    }
  },
  error => {
    if (error.response.status) {
      // Message.error("系统异常,请稍后重试");
      return Promise.reject(error.response);
    }
  }
)

/**
 * get请求
 * @param {*} url 请求地址
 * @param {*} params 参数
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      // reject(err.data)
    })
  });
}

/**
 * post请求
 * @param {*} url
 * @param {*} params
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

/**
 * put方法
 * @param {*} url
 * @param {*} params
 */
export function put(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        // reject(err)
      })
  })
}

/**
 * patch方法
 * @param {*} url
 * @param {*} params
 */
export function patch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        // reject(err)
      })
  })
}

/**
 * post下载
 * @param {*} url
 * @param {*} params
 */
export function downPost(url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      data: params,
      responseType: 'blob',
    }).then(res => {
      // var filename = res.headers['content-disposition'];
      var filename = params.fileName;
      if (window.navigator.msSaveOrOpenBlob) {

        if (filename.indexOf('.zip') != -1) {
          navigator.msSaveBlob(res.data, filename);
        } else if (filename.indexOf('.xls') != -1) {
          navigator.msSaveBlob(res.data, filename);
        } else {
          navigator.msSaveBlob(res.data, filename + '.xls');
        }

      } else {
        var a = document.createElement("a");
        var url = window.URL.createObjectURL(res.data);
        a.href = url;
        if (filename.indexOf('.zip') == -1) {
          a.download = filename + ".xls";
        } else {
          a.download = filename;
        }

        a.click();
        window.URL.revokeObjectURL(url);
      }
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
