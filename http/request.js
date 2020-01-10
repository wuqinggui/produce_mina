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
        } else {
          console.log(`___________URL:${url}失败,Params:${JSON.stringify(params)} response:`, res);
          reject(res.data);
        }
      },
      fail: res => {
        console.log(`___________URL:${url}错误,Params:${JSON.stringify(params)} response:`, res);
        reject(res);
      }
    })
  })
}

module.exports = {
  httpHeader: httpHeader,
  wxRequest: wxRequest
}