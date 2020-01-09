var urlapi = require('urlapi.js')
import { request } from '../libs/wxrequest.js';
const util = require('../utils/util.js');

class API {
  constructor(args) {
    this.get = this.init({ method: "GET" })
    this.post = this.init({ method: "POST" })
  }

  init({ method }) {
    return (url, params) => {
      return new Promise((resolve, reject) => {
        let rUrl = urlapi.getUrl(url);
        request({
          url: rUrl,
          data: params,
          method: method,
          header: urlapi.getApiHeader(),
        })
          .then(res => {
            if (res.data.code === 0) {
              console.log(`___________URL:${rUrl}成功,Params:${JSON.stringify(params)} response:`, res);
              resolve(res.data);
            } else if (res.data.code === 1004 || res.data.code === 1007){
              // 账号状态变更或者无效sessionid
              console.log(`___________URL:${rUrl}失败,Params:${JSON.stringify(params)} response:`, res);
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
              setTimeout(() => {
                getApp().globalData.userInfo = {};
                wx.removeStorageSync('qsh_session_id');
                wx.removeStorageSync('qsh_userInfo');
                wx.setStorageSync('currentPage', util.getCurrentPageUrl())
                wx.reLaunch({
                  url: '/pages/login/login'
                })
              }, 1000);
              // reject(res.data);
            } else {
              console.log(`___________URL:${rUrl}失败,Params:${JSON.stringify(params)} response:`, res);
              reject(res.data);
            }
          })
          .catch(error => {
            console.log(`___________URL:${rUrl}错误,Params:${JSON.stringify(params)} response:`, error);
            reject(error)
          })
      })
    }
  }
}

export default new API