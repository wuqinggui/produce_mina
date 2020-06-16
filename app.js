//app.js
var modal = require('./component/modal.js').default;
import Tools from './component/tools.js'

var showNetworkTips = false;// 网络错误提示
var failLoginCount = 0; // 登陆错误次数

Tools()
App({
  globalData: {
    // 全局变量
    userInfo: {}, // 用户数据
    systemInfo: {}, // 设备信息
    isIpx: false, //是否iPhone X
    isConnected: true, // 网络状态
    isAuthUserInfo: false, //是否授权用户信息
    isAuthLocation: false, //是否授权地理位置
    isSystemLocation: false, //是否打开定位权限
    longitude: 0,// 经度
    latitude: 0,// 纬度
    getOpenidEnd: false,
    getOpenidCb: null,//openid到位回调方法, 页面需要待openid到位回调成功再执行其他请求
    submitCarData: {}, // 立即下单的购物车数据
    addresseeData: {}, // 提交订单页面的收件人信息
    supplyOrderData: {}, // 补单的现订单信息
    curBigClassData: {}, // 选择的大分类信息
  },
  onLaunch: function (options) {
    console.log('------------onLaunch场景值---------', options.scene);
    console.log('------------onLaunch二维码参数---------', options);

    // 获取全局用户数据
    this.globalData.userInfo = wx.getStorageSync('sj_userInfo') ? wx.getStorageSync('sj_userInfo') : {}
    console.log('获取全局用户数据', this.globalData.userInfo);
    
    // 获取设备信息
    this.getSystemInfo();

    // 微信登录
    // this.getWXCode({ options });
    
    // 查询一下用户是否授权了 用户信息
    // this.getUserInfoSetting();

    // 查询一下用户是否授权了 地理位置
    // this.getLocationSetting();

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
    let { model } = systemInfo;
    let ipxList = ['iPhone X', 'iPhone XR', 'iPhone XS', 'iPhone XS Max', 'iPhone11'];
    // if (ipxList.indexOf(model) !== -1) {
    //   this.globalData.isIpx = true;
    // } else {
    //   this.globalData.isIpx = false;
    // }
    for (var i = 0; i < ipxList.length; i++) {
      if (model.indexOf(ipxList[i]) !== -1) {
        console.log('isIpx')
        this.globalData.isIpx = true;
        break;
      }
    }
  },

  // 用户进来的时候先用wx.login登录传code给服务端，服务端获取openid之后在数据库插一条粉丝数据。用户操作购物车的时候正常请求，当他授权手机号的时候补全他的用户信息就可以了
  getWXCode: function ({ options = {} }) {
    wx.login({
      success: (res) => {
        console.log('微信登陆成功', res)
        if (res.code) {
          // 请求服务端
          // let params = {
            // code: res.code
          // }
          // userApi.login(params)
          //   .then((res) => {
              this.globalData.getOpenidEnd = true;
              typeof this.globalData.getOpenidCb == "function" && this.globalData.getOpenidCb();
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //     failLoginCount += 1;
          //     if (failLoginCount < 5) {
          //       return this.getXToken({ options });
          //     } else {
          //       wx.showToast({
          //         title: '登录出错，请重试',
          //         icon: 'none'
          //       });
          //     }
          //   })
        } else {
          failLoginCount += 1;
          if (failLoginCount < 5) {
            return this.getWXCode({ options });
          } else {
            wx.showToast({
              title: '登录出错，请重试',
              icon: 'none'
            });
          }
        }
      },
      fail: (res) => {
        console.log('获取API授权失败', res);
        failLoginCount += 1;
        if (failLoginCount < 5) {
          return this.getWXCode({ options });
        } else {
          wx.showToast({
            title: '登录出错，请重试',
            icon: 'none'
          });
        }
      }
    });
  },

  // 获取用户信息授权
  getUserInfoSetting: function () {
    this.getSetting('scope.userInfo')
      .then((res) => {
        console.log('用户信息授权成功', res)
        this.globalData.isAuthUserInfo = true;
      })
      .catch((error) => {
        console.log('用户信息授权失败', error)
        this.globalData.isAuthUserInfo = false;
      })
  },

  // 查询授权情况
  getSetting: function (setting) {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          let { authSetting, errMsg } = res;
          console.log('获取授权', setting, '返回结果', res);
          /**
           * undefined: 未授权
           * true: 已授权
           * false: 拒绝授权
           */
          let status = authSetting[setting];
          if (status) {
            console.log('已授权', setting)
            resolve({ status, res });
          } else {
            console.log('未授权', setting)
            reject({ status, res });
          }
        },
        fail: (error) => {
          console.log('查询授权情况失败')
          reject({ status: undefined, res: error })
        }
      })
    });
  },

  // 通过 wx.getSetting 先查询一下用户是否授权了 地理位置
  getLocationSetting: function () {
    this.getSetting('scope.userLocation')
      .then((res) => {
        this.getLocation();// 已授权，获取当前地理位置
      })
      .catch(({ status, res }) => {
        // 拒绝授权
        if (status === false) {
          console.log('拒绝授权');
        } else {
          console.log('地理位置没授权');
        }
        this.setLocation()
          .then((res2) => {
            // console.log('res2', res2)
          })
          .catch((error2) => {
            // console.log('error2', error2)
          });
      })
  },

  // 获取经纬度
  getLocation: function () {
    return new Promise((resolve, reject) => {
      let returnData = {
        isAuthLocation: false,
        isSystemLocation: false,
        longitude: 0,
        latitude: 0
      }
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: (res) => {
          let { longitude, latitude } = res;
          console.log('---------------------------地理位置---------------------------');
          console.log('latitude', latitude);
          console.log('longitude', longitude);
          console.log('---------------------------地理位置---------------------------');

          this.globalData.isAuthLocation = true;
          this.globalData.isSystemLocation = true;
          this.globalData.longitude = longitude;
          this.globalData.latitude = latitude;
          returnData.isAuthLocation = true;
          returnData.isSystemLocation = true;
          returnData.longitude = longitude;
          returnData.latitude = latitude;
          resolve(returnData);
        },
        fail: (error) => {
          console.log('地理位置已授权，但获取地理位置失败', error);
          let { errMsg } = error;
          if (errMsg.indexOf('getLocation:fail') > -1) {
            this.globalData.isAuthLocation = true;
            returnData.isAuthLocation = true;
            console.log('系统没有获取位置权限')
          }
          reject(returnData);
        }
      });
    });
  },

  // 地理位置授权
  setLocation: function (again) {
    return new Promise((resolve, reject) => {
      wx.authorize({
        scope: 'scope.userLocation',
        success: (res) => {
          console.log('允许地理位置授权', res)
          this.getLocation()
            .then((res2) => {
              resolve(res2);
            })
            .catch((error2) => {
              reject(error2);
            })
        },
        fail: (error) => {
          console.log('拒绝地理位置授权', error);
          if (again && again === 1) {
            this.openConfirm();
          }
          reject(error);
        }
      })
    });
  },

  // 由于定位服务拒绝后，再次请求直接进入fail，需要二次设置打开
  openConfirm: function () {
    wx.showModal({
      content: '检测到您没打开定位权限，是否去设置打开？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        //点击“确认”时打开设置页面
        if (res.confirm) {
          console.log('用户点击确认')
          wx.openSetting({
            success: (res) => { }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },

  // 授权手机号
  getPhoneNumber: function ({ iv, encryptedData, errMsg, source }) {
    return new Promise((resolve, reject) => {
      console.log(errMsg);
      switch (errMsg) {
        case 'getPhoneNumber:ok':
          wx.showLoading({
            title: '加载中...',
            mask: true
          });
          if (!iv || !encryptedData) {
            wx.hideLoading();
            reject();
            return;
          }
          let params = {
            iv,
            encryptedData
          };
          let { userInfo } = this.globalData.userInfo;
          let { mobile } = userInfo;
          // userApi.getPhonenumber(params)
          //   .then((res1) => {
          // console.log(source);
          // console.log(mobile);
          // wx.hideLoading();
          // resolve(res1);
          // })
          // .catch((error) => {
          //   modal.show({
          //     content: '当前网络不稳定，手机号授权失败，请重试。',
          //     showCancel: false,
          //     confirmText: "我知道了"
          //   });
          //   wx.hideLoading();
          //   reject(error)
          // })
          break;
        // 拒绝
        case 'getPhoneNumber:fail too frequency':
        case 'getPhoneNumber:user deny':
        case 'getPhoneNumber:fail user deny':
        case 'getPhoneNumber:fail:user cancel':
        case 'getPhoneNumber:fail:cancel':
        case 'getPhoneNumber:fail:cancel to confirm login':
          reject();
          break;
        default:
          // modal.show({
          //   content: '当前网络不稳定，手机号授权失败，请重试。',
          //   showCancel: false,
          //   confirmText: "我知道了"
          // });
          reject();
          break;
      }
    });
  },

})