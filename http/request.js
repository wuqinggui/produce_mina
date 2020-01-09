const util = require('../utils/util.js')
var MD5 = require('../libs/md5.js');

const httpHeader = (contentType) => {
  let timesTamp = parseInt(new Date().getTime() / 1000);
  let app_key = '';
  let app_secret = '';
  let session_id = wx.getStorageSync('session_id') ? wx.getStorageSync('session_id') : '';
  // object传json格式，否则传formData，仅限post请求
  contentType = contentType === 'formData' ? 'application/x-www-form-urlencoded' : 'application/json';
  return {
    'LC-Appkey': app_key,
    'LC-Timestamp': timesTamp,
    'LC-Session': session_id,
    'LC-Sign': MD5.hexMD5(app_key + timesTamp + app_secret),
    'content-type': contentType,
    'Accept': 'application/json'
  };
}

/**
 * 公共请求入口
 * @param param 'object'
 * @param url   'string'
 * @param type  'GET || POST'
 * @returns {Promise}
 */
const wxRequest = (url, type, params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      header: httpHeader(),
      method: type ? type : 'POST',
      data: params ? params : {},
      success: res => {
        if (res.data.code === 0) {
          console.log(`___________URL:${url}成功,Params:${JSON.stringify(params)} response:`, res);
          resolve(res.data);
        } else if (res.data.code === 1004 || res.data.code === 1007) { // 账号状态变更或者无效sessionid
          console.log(`___________URL:${url}失败,Params:${JSON.stringify(params)} response:`, res);
          let isGoLogin = wx.getStorageSync('isGoLogin')
          if (isGoLogin) {
            return
          } else {
            wx.setStorageSync('isGoLogin', 1) // 设置缓存isGoLogin，防止多次跳转授权登录页面
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000
            })
            // 跳转授权登录页面, 缓存在登录页面清除
            setTimeout(() => {
              let url = util.getCurrentPageUrl();
              wx.setStorageSync('goBackPageURL', url)
              wx.reLaunch({
                url: '/pages/login/login'
              })
            }, 1000);
          }
        } else {
          // 如果接口请求失败时除了弹出错误提示外，会有各自的操作，将导致这里的错误提示出不来，故在各个接口的catch各自去提示错误，不在这里统一处理
          // wx.showToast({
          //   title: res.data.msg ? res.data.msg : '网络连接异常，请稍后重试',
          //   icon: 'none',
          //   duration: 1000
          // })
          console.log(`___________URL:${url}失败,Params:${JSON.stringify(params)} response:`, res);
          reject(res);
        }
      },
      fail: res => {
        console.log(`___________URL:${url}错误,Params:${JSON.stringify(params)} response:`, res);
        wx.showToast({
          title: '网络连接异常，请稍后重试',
          icon: 'none',
          duration: 1000
        })
        // reject(err.message);
      }
    })
  })
}

module.exports = {
  httpHeader: httpHeader,
  wxRequest: wxRequest
}