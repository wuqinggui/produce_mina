//app.js
// import debug from './libs/debug.js'
var store = require('./stores/index.js');
var systemLogic = require('./logic/system.js').default;
var modal = require('./component/modal.js').default;
import { getApiHeader } from './utils/urlapi.js'
var urlapi = require('./utils/urlapi.js')
var req = require('./utils/http.js').default;
import Tools from './common/tools.js'

// const VERSION = 'experience'; // 测试环境
const VERSION = 'online';

// 网络错误提示
var showNetworkTips = false;
Tools()
App({
  globalData: {
    // 全局变量
    VERSION: VERSION,
    version: '2.1.3',
    store: store,
    debug: false, // 是否为测试环境，切换正式环境测试环境只需要改变debug的值，true表示测试环境，false表示正式环境
    userInfo: {}, // 用户数据
    timer: '', // 定义一个全局变量表示定时器
    isAuditStatus: false, // 记录同意/驳回事务，方便刷新事务列表
    isChangeTask: false, // 记录任务管理页面中对任务的操作，方便刷新任务详情
    isConnected: true, // 网络状态
    getSystemInfoEnd: false,
    getSystemInfoCb: null, //获取设备信息回调方法
    tabBar: {
      "backgroundColor": "#fff",
      "color": "#929292",
      "selectedColor": "#000000",
      "list": [
        {
          "pagePath": "/pages/business/businessList/businessList",
          "text": "商机管理",
          "iconPath": "/images/tabbar/business_manage_icon.png",
          "selectedIconPath": "/images/tabbar/business_manage_select_icon.png"
        },
        {
          "pagePath": "/pages/project/projectCenter/projectCenter",
          "text": "项目中心",
          "iconPath": "/images/tabbar/project_center_icon.png",
          "selectedIconPath": "/images/tabbar/project_center_select_icon.png"
        }
      ]
    }
  },
  onLaunch: function (options) {
    this.checkVersion()
    console.log('------------onLaunch场景值---------', options.scene);
    console.log('------------onLaunch二维码参数---------', options);

    // 获取设备信息
    systemLogic.getSystemInfo()
      .then((res) => {
        this.globalData.getSystemInfoEnd = true;
        typeof this.globalData.getSystemInfoCb == "function" && this.globalData.getSystemInfoCb();
      })
      .catch((error) => {
        console.log(error);
      })
  },
  onShow: function (options) {
    console.log('------------onShow场景值---------', options.scene);
    console.log('------------onShow二维码参数---------', options);

    // 断网提示
    if (wx.onNetworkStatusChange) {
      wx.onNetworkStatusChange(res => {
        if (!res.isConnected) {
          if (showNetworkTips) {
            return;
          }
          showNetworkTips = true;
          this.globalData.isConnected = res.isConnected;
          modal.show({
            title: "提示",
            content: '对不起，当前网络情况不正常',
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                showNetworkTips = false;
              }
            }
          });
        } else {
          // 上一次是断网状态
          if (!this.globalData.isConnected) {
            this.globalData.isConnected = res.isConnected;
            wx.hideLoading();
          }
        }
      })
    }
  },
  // 隐藏底部导航栏
  hideTabBar() {
    wx.hideTabBar({
      fail: (err) => {
        setTimeout(() => {
          wx.hideTabBar();
        }, 500);
      }
    })
  },
  // 加载底部导航栏
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  // 上传图片,支持多张,返回数组
  uploadImg(count = 1) {
    return new Promise((resolve, reject) => {
      let header = getApiHeader('formData')
      let url = urlapi.getUrl('uploadURL')
      let formData = { type: 1 }
      wx.chooseImage({
        count,
        success: files => {
          Promise.all(files.tempFilePaths.map(filePath => this.uploadFile({ url, header, formData, filePath }))).then(res => {
            resolve(res)
          })
        }
      })
    })
  },
  // 上传文件
  uploadFile(options) {
    return new Promise((resolve, reject) => {
      let { url, header, formData, filePath } = options
      let uploadTask = wx.uploadFile({
        url,
        header,
        formData,
        filePath,
        name: 'file',
        success: res => {
          res = JSON.parse(res.data)
          if (res.code === 0) {
            resolve(res.data)
            this.$msg.closeLoading()
          } else {
            reject(res)
            setTimeout(() => {
              this.$msg.error('上传失败');
            }, 500)
          }
        },
        fail: err => { // http状态码为错误时，才进入此方法
          reject(err)
          this.$msg.error('上传失败');
        }
      })
      uploadTask.onProgressUpdate(res => {
        this.$msg.loading('上传中...' + res.progress + '%');
      })
    })
  },
  onHide: function () {
    showNetworkTips = false;
  },
  // 判断线上版本和体验版本
  checkVersion() {
    let version = wx.getStorageSync('VERSION');
    if (!version || (version && version !== VERSION)) {
      wx.clearStorageSync();
    }
    wx.setStorageSync('VERSION', VERSION)
  }
})