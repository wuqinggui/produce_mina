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
  designerType: '/designer_type/list', // 设计师下拉分类
  designerList: '/webSite/designer/list', // 设计师详情
  designerDetail: '/webSite/designer/detail', // 设计师详情
  bindDecoration: '/apply/ta_decoration', // 帮我设计/找他设计
  caseType: '/webSite/case/type', // 案例下拉分类
  caseStyle: '/webSite/type_list', // 设计风格下拉
  caseList: '/webSite/case/list', // 案例列表
  caseDetail: '/webSite/case/detail', // 案例详情
  productType: '/productCenter/list_type', // 产品分类
  productList: '/productCenter/listWxApp', // 产品列表
  product_Detail: '/productCenter/detail_wxApp', // 产品详情
  applyDesigner: '/apply/designer', // 申请设计师
  applyProvider: '/apply/provider', // 申请供应商
  applyPattern: '/apply/pattern', // 申请合伙人
  provinceList: '/region/province/list', // 获取省份列表
  cityList: '/region/city/list', // 获取城市列表
  myInfo: '/app/myMessage', // 获取个人中心数据
  wxLogin: '/app/info', // 微信手机号登陆
  login: '/app/login', // 登陆
  loginSession: '/app/session', // 登陆后获取的用户数据
  ownerTaskList: '/mission/client_list', // 业主身份任务列表
  designerTaskList: '/mission/wxApp_list', // 设计师身份对应的任务列表
  addEvaluate: '/mission/add_evaluate', // 新增评价
  taskDetail: '/mission/client_detail', // 任务详情
  addMessage: '/mission/add_message', // 新增留言
  addComplain: '/mission/add_complain', // 投诉
  nodeDetail: '/mission/node_detail', // 节点详情
  productDetail: '/mission/product_detail', // 产品详情
  businessList: '/otherBusiness/get_list', // 事务列表
  businessDetail: '/otherBusiness/app_detail', // 事务详情
  changeBusinessSataus: '/otherBusiness/update_AuditStatus', // 修改事务状态
  addMark: '/mission/add_remark', // 添加备注
  restart: '/mission/restart', // 重启任务
  photo: '/mission/upload', // 拍照
  reserveTime: '/mission/add_reserveTime', // 修改预定完成时间
  finishTime: '/mission/add_FinishTime', // 完成时间完成节点
  activityList: '/webSite/activity/list', // 活动列表
  activityDetail: '/webSite/activity/detail', //活动详情
  informationList: '/webSite/information/list', // 资讯列表
  informationDetail: '/webSite/information/detail', // 资讯详情
  cooperations: '/webSite/space', // 联合办公
  supply: '/webSite/appletBanner/list', // 供应商列表
  supplyDetail: '/webSite/appletBanner_details', // 供应商详情
  applyCenter: '/apply/enter', // 申请入驻
  myApply: '/apply/apply_for', // 我的设计申请
  suggestionBack: '/feedback/add_feedBack', // 意见反馈
  myRecommend: '/app/sharePoster', // 我的推荐,
  addRecommend: '/businessRecommend/add_businessRecommend' // 业务推荐
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
  let qsh_session_id = wx.getStorageSync('qsh_session_id') ? wx.getStorageSync('qsh_session_id') : '20888ef6a2ca4746abac6b1ee2de506c77';
  let { version } = getApp().globalData;
  // object传json格式，否则传formData，仅限post请求
  contentType = contentType === 'formData' ? 'application/x-www-form-urlencoded' : 'application/json';
  return {
    'LC-Appkey': app_key,
    'LC-Timestamp': timesTamp,
    'LC-Session': qsh_session_id,
    'LC-Sign': MD5.hexMD5(app_key + timesTamp + app_secret),
    'content-type': contentType,
    'Accept': 'application/json',
    'Lc-Version': version
  };
}

module.exports = {
  getUrl: getUrl,
  getApiHeader: getApiHeader
}
