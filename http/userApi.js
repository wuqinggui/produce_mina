var wxRequest = require('./request.js').wxRequest;
import { loginURL, getPhonenumberURL, getUserInfoUrl, updateUserInfoUrl  } from './url'

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
  getPhoneNumber: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(getPhonenumberURL, 'POST', params)
        .then((res) => {
          getApp().globalData.saveUserinfo(res);
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  getUserInfo: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(getUserInfoUrl, 'POST', params)
        .then((res) => {
          getApp().globalData.saveUserinfo(res);
          resolve(res);
        })
        .catch((error) => reject(error))
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