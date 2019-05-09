import axios from 'axios'
import qs from 'qs'
import {Toast} from 'mint-ui';
import fun from '@/method/method'

let api;
let reg_api;
let token;
let mark;
if (location.origin.indexOf('http://localhost:') >= 0) {
  api = '//i.hjtz.com/api';
  reg_api = '//i.hjtz.com/mobile';
  token = 'p6glf1v2w4my5nmr3t28krznodq1goif';
  mark = '7642e0098e812f79e67d161fbf0c7ae5';
  // token = 'lzfs8831u1alaiyrgafudsorlh37fv38';
  // mark = 'cbc4ecc3eae377e91b9196460fdbb645';
} else {
  api = '/api';
  reg_api = '/mobile';
  token = fun.getCookie('token');
  mark = fun.getCookie('mark');
}
const CancelToken = axios.CancelToken;
//添加响应拦截器
axios.interceptors.response.use(response => {
    let code = response.data.code;
    if (code != 10000) {
      Toast(response.data.message);
      if (code == 10100) {
        let set_id = setTimeout(() => {
          fun.toLogin();
          clearTimeout(set_id)
        }, 1000);
      }
    }
    return response;
  }, error => {
    return Promise.reject(error)
  }
);

//封装的axios post请求
export function post(url, data = {}) {
  url = api + url;
  data['token'] = token;
  data['mark'] = mark;
  data['language'] = fun.getCookie('odrthink_language') || 'zh-tw';
  data = qs.stringify(data);
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

//封装注册时使用的axios post请求
export function reg_post(url, data = {}) {
  url = reg_api + url;
  data['language'] = fun.getCookie('odrthink_language') || 'zh-tw';
  data = qs.stringify(data);
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}


