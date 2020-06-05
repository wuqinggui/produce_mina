var userApi = require('../../http/userApi.js').default;
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    loginTipShow: false, // 是否显示弹框
    wxSetting: false, // 是否微信授权
    code: '', // 微信登录的code
    encryptedData: '', // 微信用户信息接口encryptedData
    iv: '', // 微信用户信息接口iv
    signature: '', // 微信用户信息接口signature
    phoneIv: '', // 微信手机号授权iv
    phoneEncryptedData: '', // 微信手机号授权phoneEncryptedData
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //关闭弹窗
    closeLoginTip: function () {
      // console.log('关闭登陆弹框')
      this.setData({
        loginTipShow: false
      })
    },
    //显示弹窗
    showLoginTip: function () {
      console.log('打开登陆弹框，清空用户信息和缓存')
      getApp().globalData.userInfo = {};
      wx.removeStorageSync('sj_userInfo');
      wx.removeStorageSync('sj_userId');
      wx.removeStorageSync('sj_token');
      this.setData({
        wxSetting: false,
        loginTipShow: true
      })
    },

    // 微信授权,获取用户头像昵称信息
    getUserInfo: function (e) {
        // console.log('微信授权', e)
        if (e.detail.userInfo) { // 已授权
          // 已授权的也重新获取微信用户数据，防止数据过时失效
          // 微信登录
          wx.login({
            success: res => {
              console.log('微信登录', res)
              this.setData({
                code: res.code
              })
              // 带上登录状态重新获取用户数据
              wx.getUserInfo({
                withCredentials: true,
                success: res => {
                  console.log('带上登录状态获取授权数据成功', res)
                  wx.showToast({
                    title: '用户信息授权成功',
                    icon: 'none',
                    duration: 1000
                  })
                  this.setData({
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                    signature: res.signature,
                    wxSetting: true
                  })
                }
              })
            }
          })
        }
      },
      // 微信手机号授权
      getPhoneNumber: function (e) {
        console.log('微信手机号授权', e)
        if (e.detail.errMsg && e.detail.errMsg === 'getPhoneNumber:ok') {
          let { iv, encryptedData } = e.detail
          console.log(e.detail);
          wx.showToast({
            title: '微信手机号授权成功',
            icon: 'none',
            duration: 1000
         })
          this.setData({
            phoneIv: iv,
            phoneEncryptedData: encryptedData,
          })
          this.weChatLogin();
        }
      },

      // 微信登录
      weChatLogin: function () {
        wx.showLoading({
          title: '登录中',
        });
        let _self = this;
        let wxLoginDto = {
          wxCode: _self.data.code, // 微信code
          signature: _self.data.signature, // 用户授权signature
          encryptedData: _self.data.encryptedData, // 用户授权encryptedData
          iv: _self.data.iv, // 用户授权iv
          phoneIv: _self.data.phoneIv, // 手机号授权iv
          phoneEncryptedData: _self.data.phoneEncryptedData // 手机号授权encryptedData
        }
        userApi.loginWx(wxLoginDto).then(res => {
          console.log('微信快捷登录成功', res)
          // wx.hideLoading(); 
          this.getToken(res.data);
        }).catch(err => {
          wx.hideLoading();
          console.log(err);
          wx.showToast({
            title: err.errMsg ? err.errMsg : '网络连接异常，请稍后重试',
            icon: 'none',
            duration: 1000
          })
        })
      },
      // 根据token获取用户信息
      getToken: function (token) {
        userApi.token({
          token: token
        })
          .then((res) => {
            console.log('根据token获取用户信息成功', res)
            wx.hideLoading();
            var userInfo = res.data;
            console.log('存储用户数据和设置缓存', userInfo)
            getApp().globalData.userInfo = userInfo;
            wx.setStorageSync("sj_userInfo", userInfo);
            wx.setStorageSync("sj_userId", userInfo.id);
            wx.setStorageSync("sj_token", userInfo.token);
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1000
            })
            var _this = this;
            setTimeout(() => {
              //关闭弹窗, 回调方法，继续当前页面操作
              console.log('关闭弹窗, 回调方法，继续当前页面操作')
              _this.setData({
                loginTipShow: false
              })
              var callBackData = {}; //回调参数可以不传
              _this.triggerEvent('myevent', callBackData); // 触发页面方法
            }, 1000);
          })
          .catch((error) => {
            console.log('根据token获取用户信息失败', error)
            wx.hideLoading();
            wx.showToast({
              title: error.message ? error.message : '根据token获取用户信息失败',
              icon: 'none'
            });
          })
      },
  }
})
