var systemStore = require('../stores/system.js').default;

var system = {
  getSystemInfo: function () {
    return new Promise((resolve, reject) => {
      if (wx.getStorageSync('systemInfo')) {
        this.setSystemInfo(wx.getStorageSync('systemInfo'));
        resolve();
      } else {
        try {
          const res = wx.getSystemInfoSync();
          this.setSystemInfo(res);
          resolve();
        } catch (e) {
          systemStore.statusBarHeight = 0
          systemStore.titleBarHeight = 0
          systemStore.totalTopHeight = 0
          reject();
        }
      }
    });
  },
  // 设置系统信息
  setSystemInfo: function (systemInfo) {
    console.log('------------设备信息---------', systemInfo);

    let { statusBarHeight, model, SDKVersion, brand } = systemInfo;
    /**
     * 标题栏高度
     * 安卓: 48
     * iphone: 44
     * iphoneX: 44
     */
    let titleBarHeight;
    if (model.indexOf('iPhone X') < 0 && model.indexOf('iPhone') < 0 && model.indexOf('iPhone11') < 0) {
      systemStore.isAndroid = true;
      titleBarHeight = 48;
    } else {
      titleBarHeight = 44;
      if (model.indexOf('iPhone X') !== -1 || model.indexOf('iPhone11') !== -1) {
        systemStore.isIpx = true;
      }
    }
    /**
     * 总高 (titleBarHeight + statusBarHeight)
     * 安卓: 68
     * iphone: 64
     * iphoneX: 88
     */
    let totalTopHeight = titleBarHeight + statusBarHeight;

    /**
     * 状态栏高度
     * 安卓: 20
     * iphone: 20
     * iphoneX: 44
     */
    systemStore.statusBarHeight = statusBarHeight
    systemStore.titleBarHeight = titleBarHeight
    systemStore.totalTopHeight = totalTopHeight;

    systemStore.systemInfo = {
      windowHeight: systemInfo.windowHeight
    };

    // 华为
    if (brand === 'HONOR') {
      systemStore.isHONOR = true;
    }
  }
}

export default system;