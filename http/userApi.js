var wxRequest = require('./request.js').wxRequest;
import { loginURL, tokenURL  } from './url'

var userApi = {
  // 登陆
  login: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(loginURL, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 根据token获取用户信息
  token: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(tokenURL, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  }
}

export default userApi;