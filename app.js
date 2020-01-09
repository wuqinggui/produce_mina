//app.js
var modal = require('./component/modal.js').default;
import Tools from './component/tools.js'

// 网络错误提示
var showNetworkTips = false;

Tools()
App({
  globalData: {
    // 全局变量
    userInfo: {}, // 用户数据
    systemInfo: {}, // 设备信息
    isIpx: false, //是否iPhone X
    timer: '', // 定义一个全局变量表示定时器
    isConnected: true, // 网络状态
  },
  onLaunch: function (options) {
    console.log('------------onLaunch场景值---------', options.scene);
    console.log('------------onLaunch二维码参数---------', options);

    // 获取设备信息
    this.getSystemInfo();

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
  onHide: function () {
    showNetworkTips = false;
  },
  // 获取设备信息
  getSystemInfo: function () {
    var systemInfo = wx.getSystemInfoSync()
    console.log('------------设备信息---------', systemInfo);
    let {  model } = systemInfo;
    if (model.indexOf('iPhone X') !== -1 || model.indexOf('iPhone11') !== -1) {
      this.globalData.isIpx = true;
    }
  }
})