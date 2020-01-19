function httpHeader () {
  return {
    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'authUserid': wx.getStorageSync("userId") ? wx.getStorageSync("userId") : ''
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
        if (res.data.code === 20000) {
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