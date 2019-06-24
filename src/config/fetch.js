import axios from 'axios'
import qs from 'qs'
// import store from '../store/index.js'
// import router from '../router/index.js'


axios.defaults.timeout = 30000;
axios.defaults.baseURL = 'http://test.blog.api.mobile.daipianpian.com'; //测试接口域名
// axios.defaults.baseURL = 'http://blog.api.mobile.daipianpian.com'; //正式接口域名


axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.headers['Content-Type'] = 'application/json';
    return config;
  }
}, (error) => {
  var str = "输入有误，请核对";
  console.log(str);
  return;
})

axios.interceptors.response.use(response => {
  // console.log(response);
  let code = response.data.code;
  if (code == 20100) { // 登录失效

  } else if (code != 10000 && code != 20100) {

  }

  return response;
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        console.log(err.message);
        break;
      case 403:
        err.message = '拒绝访问'
        console.log(err.message);
        break;
      case 404:
        err.message = '请求错误,未找到该资源'
        console.log(err.message);
        break;
      case 405:
        err.message = '请求方法未允许'
        console.log(err.message);
        break;
      case 408:
        err.message = '请求超时';
        console.log(err.message);
        break;
      case 502:
        err.message = '网络错误';
        console.log(err.message);
        break;
      case 504:
        err.message = '网络超时';
        console.log(err.message);
        break;
      default:
        err.message = '连接错误${err.response.status}'
        console.log(err.message);
    }
  } else {
    err.message = "连接到服务器失败"
    console.log(err.message);
  }
  return Promise.resolve(err.response)
})

export function fetch(url, params, responseType) {
  return new Promise((resolve, reject) => {
    // 普通post请求
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}