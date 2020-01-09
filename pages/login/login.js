
const util = require('../../utils/util.js');
// const userApi = require('../../api/user.js').default;
const app = getApp()
const MD5 = require('../../libs/md5.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIpx: false,
    loginWay: 'isWeChantLogin',
    type: 2, // 登陆方式: 1账号密码，2账号短信验证码
    code_tip: '获取验证码',
    account: '',
    sms_code: '',
    password: '',
    isSubmit: false,
    code: '', // 微信code
    iv: '', // 微信手机号授权iv
    phoneEncryptedData: '', // 微信手机号授权phoneEncryptedData
    wxLogin: false, // 是否微信授权
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // 清除定时器
    if (app.globalData.timer) {
      clearInterval(app.globalData.timer);
      app.globalData.timer = '';
    }
    let { systemStore } = app.globalData.store;
    this.setData({
      isIpx: systemStore.isIpx
    });
    
    // 查看授权结果
    wx.getSetting({
      success(res) {
        if (res.errMsg === 'getSetting:ok'){
          if (res.authSetting['scope.userInfo']) {
            _this.setData({
              wxLogin: true
            })
          }
        }
      }
    })
    // let qsh_session_id = wx.getStorageSync('qsh_session_id') ? wx.getStorageSync('qsh_session_id') : '';
    // let qsh_userInfo = wx.getStorageSync('qsh_userInfo') ? wx.getStorageSync('qsh_userInfo') : '';
    // if (qsh_session_id && qsh_userInfo && qsh_userInfo.type) {
    //   if (qsh_userInfo.type === 1 && qsh_userInfo.role_id === 1) {
    //       // 已登陆的官网运营用户直接进入事务列表
    //       app.globalData.userInfo = qsh_userInfo;
    //       wx.switchTab({
    //         url: '/pages/business/businessList/businessList'
    //       })
    //   } else if (qsh_userInfo.type === 2 || qsh_userInfo.type === 4) {
    //     // 已登陆的设计师或者业主直接进入任务列表
    //     app.globalData.userInfo = qsh_userInfo;
    //     wx.redirectTo({
    //       url: '/pages/task/taskList/taskList'
    //     })

    //   } else if (qsh_userInfo.type === 3) {
    //     // 供应商用户
        

    //   } else if (qsh_userInfo.type === 5) {
    //     // 分舵用户
        
    //   }
    // }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // 清除定时器
    if (app.globalData.timer) {
      clearInterval(app.globalData.timer);
      app.globalData.timer = '';
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
	 * 页面上拉触底事件的处理函数
	 */
  onReachBottom: function () {
    
  },

  // 账号密码/验证码登录
  changeAccountLogin: function () {
    this.setData({
      code: '', // 微信code
      iv: '', // 微信用户授权iv
      encryptedData: '', // 微信用户授权EncryptedData
      phoneIv: '', // 微信手机号授权iv
      phoneEncryptedData: '', // 微信手机号授权EncryptedData
      loginWay: 'isAccount',
      type: 2,
      code_tip: '获取验证码',
      account: '',
      sms_code: '',
      password: ''
    })
  },

  // 切换账号登陆方式
  changeLoginType: function (e) {
    let type = parseInt(e.target.dataset.type);
    if (this.data.type !== type) {
      this.setData({
        type: type,
        sms_code: '',
        password: ''
      })
    }
  },

  bindKeyPhone: function (e) {
    this.setData({
      account: e.detail.value
    })
  },

  bindKeyCode: function (e) {
    this.setData({
      sms_code: e.detail.value
    })
  },

  bindKeyPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 授权微信code
  getWxCode: function () {
    let _self = this;
    wx.login({
      success(res) {
        if (res.code) {
          _self.setData({
            code: res.code
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  // 微信用户授权
  getUserInfo: function (e) {
    if (e.detail.errMsg === 'getUserInfo:ok') {
      let { encryptedData, iv, rawData } = e.detail
      this.setData({
        iv,
        encryptedData,
        wxLogin: true
      })
    }
  },

  // 微信手机号授权
  getPhoneNumber: function (e) {
    if (e.detail.errMsg && e.detail.errMsg === 'getPhoneNumber:ok') {
      let { iv, encryptedData } = e.detail
      this.setData({
        phoneIv: iv,
        phoneEncryptedData: encryptedData,
      })
      this.weChatLogin();
    }
  },

  // 微信手机号登陆
  weChatLogin: function () {
    let { code, iv, encryptedData, phoneIv, phoneEncryptedData } = this.data
    let basic_phone = wx.getStorageSync('scenePhone') ? wx.getStorageSync('scenePhone') : '';
    if (this.data.isSubmit) {
      return
    }
    this.setData({
      isSubmit: true
    })
    wx.showLoading({
      title: '登录中',
    });
    userApi.wxPhoneLogin({
      basic_phone,
      iv,
      encryptedData,
      code,
      phoneIv,
      phoneEncryptedData
    })
      .then((res) => {
        wx.hideLoading();
        this.setData({
          isSubmit: false
        })
        this.loginSuccess(res.data);
      })
      .catch((error) => {
        wx.hideLoading();
        this.setData({
          isSubmit: false
        })
        wx.showToast({
          title: error.msg ? error.msg : '当前网络连接不稳定，请稍后重试',
          icon: 'none'
        });
      })
  },

  // 获取验证码
  getCode: function () {
    if (this.data.isSubmit) {
      return;
    }
    if (!util.matchFn('tel', this.data.account)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      });
      return;
    }
    this.setData({
      isSubmit: true
    })
    userApi.getCode({
      phone: this.data.account,
      type: 2 // 表示登陆的获取验证码
    })
      .then((res) => {
        this.setData({
          isSubmit: false,
          code_tip: '60S'
        })
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 1000
        });

        // 清除定时器，再重新设置新的定时器
        if (app.globalData.timer) {
          clearInterval(app.globalData.timer);
          app.globalData.timer = '';
        }

        //  定时器 
        let _self = this;
        let startTime = 60;
        app.globalData.timer = setInterval(function () {
          startTime--;
          if (startTime > 0) {
            _self.setData({
              code_tip: startTime + 'S'
            })
          } else {
            _self.stopCodeTime();
          }
        }, 1000);
      })
      .catch((error) => {
        console.log('error', error)
        this.setData({
          isSubmit: false
        })
        wx.showToast({
          title: error.msg ? error.msg : '当前网络连接不稳定，请稍后重试',
          icon: 'none'
        });
      })
  },

  // 结束倒计时
  stopCodeTime: function () {
    clearInterval(app.globalData.timer);
    app.globalData.timer = '';
    this.setData({
      code_tip: '获取验证码'
    })
  },

  // 保存
  toSubmit: function () {
    if (this.data.isSubmit) {
      return;
    }
    if (!util.matchFn('tel', this.data.account)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      });
      return;
    }
    if (this.data.type === 2) {
      if (!util.matchFn('letterOrNum', this.data.sms_code)) {
        wx.showToast({
          title: '请输入正确的验证码',
          icon: 'none'
        });
        return;
      }
    } else if (this.data.type === 1) {
      if (!util.matchFn('letterOrNum', this.data.password)) {
        wx.showToast({
          title: '请输入正确的密码格式',
          icon: 'none'
        });
        return;
      }
    }
    this.setData({
      isSubmit: true
    })
    
    wx.showLoading({
      title: '登录中',
    });
    userApi.login({
      account: this.data.account,
      password: this.data.type === 1 && this.data.password ? MD5.hexMD5(this.data.password) : '',
      sms_code: this.data.type === 2 && this.data.sms_code ? this.data.sms_code : '',
      type: this.data.type
    })
      .then((res) => {
        this.getLoginSession(res.data.ticket);
      })
      .catch((error) => {
        wx.hideLoading();
        this.setData({
          isSubmit: false
        })
        wx.showToast({
          title: error.msg ? error.msg : '当前网络连接不稳定，请稍后重试',
          icon: 'none'
        });
      })
  },

  // 获取登陆后的用户数据
  getLoginSession: function (ticket) {
    userApi.getSession({
      ticket: ticket
    })
      .then((res) => {
        wx.hideLoading();
        this.setData({
          isSubmit: false
        })
        this.loginSuccess(res.data);
      })
      .catch((error) => {
        wx.hideLoading();
        this.setData({
          isSubmit: false
        })
        wx.showToast({
          title: error.msg ? error.msg : '当前网络连接不稳定，请稍后重试',
          icon: 'none'
        });
      })
  },

  // 登陆成功的判断操作
  loginSuccess: function (data) {
    app.globalData.userInfo = data;
    wx.setStorageSync('qsh_userInfo', data);
    wx.setStorageSync('qsh_session_id', data.session_id);
    let currentPage = wx.getStorageSync('currentPage') ? `..${wx.getStorageSync('currentPage').route.split('pages')[1]}` : ''
    // 跳回--个人中心页
    // wx.switchTab({
    //   url: '/pages/personal/personal'
    // })
    if (currentPage) {
      setTimeout(() => {
        wx.reLaunch({
          url: currentPage
        })
      }, 1000);
    } else {
      wx.navigateBack();
    }

    // if (data.type === 1 && data.role_id === 1) {
    //     // 官网运营用户
    //     app.globalData.userInfo = data;
    //     wx.setStorageSync('qsh_userInfo', data);
    //     wx.setStorageSync('qsh_session_id', data.session_id);
    //     wx.switchTab({
    //       url: '/pages/business/businessList/businessList'
    //     })
    // } else if (data.type === 2 || data.type === 4) {
    //   // 设计师用户type为2，业主用户type为4
    //   app.globalData.userInfo = data;
    //   wx.setStorageSync('qsh_userInfo', data);
    //   wx.setStorageSync('qsh_session_id', data.session_id);
    //   wx.redirectTo({
    //     url: '/pages/task/taskList/taskList'
    //   })
    // } else if (data.type === 3) {
    //   // 供应商用户
    //   wx.showToast({
    //     title: '供应商用户不能进入',
    //     icon: 'none'
    //   });

    // } else if (data.type === 5) {
    //   // 分舵用户
    //   wx.showToast({
    //     title: '分舵用户不能进入',
    //     icon: 'none'
    //   });
    // } else {
    //   wx.showToast({
    //     title: '很抱歉，您的身份不符合，不能进入',
    //     icon: 'none'
    //   });
    // }
  }
})