var wxRequest = require('./request.js').wxRequest;
import { loginURL,getPhonenumberURL,getUserInfoUrl,updateUserInfoUrl  } from './url'

var userApi = {
  login: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(loginURL, 'POST', params)
        .then((res) => {
          getApp().globalData.saveUserinfo(res);
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  getPhonenumber: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(getPhonenumberURL, 'POST', params)
        .then((res) => {
          getApp().globalData.saveUserinfo(res);
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  getUserinfo: function (params) {
    console.log('getUserinfo', params)
    return new Promise((resolve, reject) => {
      wxRequest(getUserInfoUrl, 'POST', params)
        .then((res) => {
          console.log('res', res)
          getApp().globalData.saveUserinfo(res);
          resolve(res);
        })
        .catch((error) => {
          
          console.log('error', error)
          reject(error)
        })
    });
  },
  updateUserInfo: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(updateUserInfoUrl, 'POST', params)
        .then((res) => {
          getApp().globalData.saveUserinfo(res);
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  }
}

export default userApi;