//app.js
var store = require('./stores/index.js');
var systemLogic = require('./logic/system.js').default;
var modal = require('./component/modal.js').default;

// 网络错误提示
var showNetworkTips = false;
App({
  globalData: {
    // 全局变量
    store: store,
    debug: false, // 是否为测试环境，切换正式环境测试环境只需要改变debug的值，true表示测试环境，false表示正式环境
    userInfo: {}, // 用户数据
    timer: '', // 定义一个全局变量表示定时器
    isConnected: true, // 网络状态
    getSystemInfoEnd: false,
    getSystemInfoCb: null, //获取设备信息回调方法
  },
  onLaunch: function (options) {
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
  onHide: function () {
    showNetworkTips = false;
  },
})