var userApi = require('../../http/userApi.js').default;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxSetting: false, // 是否微信授权
    code: '', // 微信登录的code
    encryptedData: '', // 微信用户信息接口encryptedData
    iv: '', // 微信用户信息接口iv
    signature: '', // 微信用户信息接口signature
    phoneIv: '', // 微信手机号授权iv
    phoneEncryptedData: '', // 微信手机号授权phoneEncryptedData
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('清空用户信息和缓存')
    getApp().globalData.userInfo = {};
    wx.removeStorageSync('sj_userInfo');
    wx.removeStorageSync('sj_userId');
    wx.removeStorageSync('sj_token');
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }

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
      this.setData({
        phoneIv: iv,
        phoneEncryptedData: encryptedData,
      })
      // this.weChatLogin();
    }
  },

  // 微信登录
  weChatLogin: function () {
    wx.showLoading({
      title: '登录中',
    });
    let _self = this;
    let params = {
      code: _self.data.code,
      signature: _self.data.signature,
      encryptedData: _self.data.encryptedData,
      iv: _self.data.iv,
      phoneIv: _self.data.phoneIv,
      phoneEncryptedData: _self.data.phoneEncryptedData,
    }
    userApi.login(params).then(res => {
      wx.hideLoading();
      console.log('微信快捷登录成功', res)
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: err.data.msg ? err.data.msg : '网络连接异常，请稍后重试',
        icon: 'none',
        duration: 1000
      })
    })
  },
})