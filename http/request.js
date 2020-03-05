var util = require('../utils/util.js')

function httpHeader (contentType) {
  // object传json格式，否则传formData，仅限post请求
  contentType = contentType === 'formData' ? 'application/x-www-form-urlencoded;charset=UTF-8' : 'application/json;charset=UTF-8';
  return {
    'content-type': contentType
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
    let formDataUrlList = [];
    let isFormData = false;
    if (formDataUrlList.indexOf(url) !== -1) {
      isFormData = true;
    }
    wx.request({
      url: url,
      header: isFormData ? httpHeader('formData') : httpHeader(),
      method: type ? type : 'POST',
      data: params ? params : {},
      success: res => {
        if (res.data.code === 20000) {
          console.log(`___________URL:${url}成功,Params:${JSON.stringify(params)} response:`, res);
          resolve(res.data);
        } 
        // else if (res.data.code === 1004 || res.data.code === 1007) { // 账号状态变更或者无效sessionid
        //     wx.showToast({
        //       title: res.data.message ? res.data.message : '登陆过期，请重新登陆',
        //       icon: 'none',
        //       duration: 1000
        //     })
        //     setTimeout(() => {
        //       let pageUrl = util.getCurrentPageUrl(1); // 不带参数
        //       if (pageUrl !== 'pages/login/login') {
        //         wx.navigateTo({
        //           url: '/pages/login/login'
        //         })
        //       }
        //     }, 1000);
        // } 
        else {
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