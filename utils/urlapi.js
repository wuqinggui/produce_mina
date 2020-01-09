// 切换正式环境测试环境只需要去app.js改变debug的值，true表示测试环境，false表示正式环境

var MD5 = require('../libs/md5.js');

var apidomain = {
  // 基础接口
  base: {
    prod: 'https://api.qshdesign.com/api/v1',
    debug: 'http://api.dvea.jclang.me/api/v1',
  },
 
  // 公共接口
  common: {
    prod: 'https://api.qshdesign.com/common',
    debug: 'http://api.dvea.jclang.me/common',
  }
}

var api_base = {
  indexCity: '/index/down_city', // 首页-城市下拉列表
  indexList: '/index/wxApp_list', // 首页-数据
};

var api_common = {
  sendCode: '/send', // 发送验证码
  uploadURL: '/upload', // 上传文件（图片）
};

function getSuffix () {
  let { debug } = getApp().globalData;
  if (debug) {
    return 'debug';
  } else {
    return 'prod';
  }
}

function getUrl(path) {
  if (api_common.hasOwnProperty(path)) {
    return `${apidomain['common'][getSuffix()]}${api_common[path]}`;
  }
  return `${apidomain['base'][getSuffix()]}${api_base[path]}`;
}

function getApiHeader(contentType) {
  let timesTamp = parseInt(new Date().getTime() / 1000);
  let app_key = 'b0b1a56c6fa5a13dfb0ee65suj8cjw';
  let app_secret = 'e8c410df2f433360440w8jemyse3kci';
  let qsh_session_id = wx.getStorageSync('qsh_session_id') ? wx.getStorageSync('qsh_session_id') : '';
  // object传json格式，否则传formData，仅限post请求
  contentType = contentType === 'formData' ? 'application/x-www-form-urlencoded' : 'application/json';
  return {
    'LC-Appkey': app_key,
    'LC-Timestamp': timesTamp,
    'LC-Session': qsh_session_id,
    'LC-Sign': MD5.hexMD5(app_key + timesTamp + app_secret),
    'content-type': contentType,
    'Accept': 'application/json'
  };
}

module.exports = {
  getUrl: getUrl,
  getApiHeader: getApiHeader
}
