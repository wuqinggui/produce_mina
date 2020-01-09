import { POST_USER_REGISTER_URL } from '../../http/url.js'
const request = require('../../http/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    encryptedData: '', // 微信用户信息接口encryptedData
    iv: '', // 微信用户信息接口iv
    signature: '', // 微信用户信息接口signature
    code: '', // 微信登录的code
    isSubmit: false // 防止用户频繁点击按钮
  },

  // 初始化
  init: function () {
    this.setData({
      encryptedData: '',
      iv: '',
      signature: '',
      code: '',
      isSubmit: false
    })
    getApp().globalData.userInfo = {};
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('session_id');
  },

  // 微信授权,获取用户头像昵称信息
  getUserInfo: function (e) {
    if (this.data.isSubmit) {
      return
    } else {
      this.setData({
        isSubmit: true
      })
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
                  signature: res.signature
                })
                this.postWXLogin();
              },
              fail: res => {
                // console.log('重新获取授权数据失败', res)
                this.setData({
                  isSubmit: false
                })
              }
            })
          },
          fail: res => {
            // console.log('登录失败', res)
            this.setData({
              isSubmit: false
            })
          }
        })
      } else {
        this.setData({
          isSubmit: false
        })
      }
    }
  },

  // 微信登录，获取session_id
  postWXLogin: function () {
    let _self = this;
    wx.removeStorageSync('isGoLogin'); // 在进行http请求之前先清除isGoLogin缓存
    let url = POST_USER_REGISTER_URL;
    let type = 'POST';
    let param = {
      code: _self.data.code,
      signature: _self.data.signature,
      encryptedData: _self.data.encryptedData,
      iv: _self.data.iv
    }
    request.wxRequest(url, type, param).then(res => {
      console.log('微信快捷登录成功', res)
      // 其它位置根据用户session_id判断是否已登录
      getApp().globalData.userInfo = res.data;
      wx.setStorageSync('userInfo', res.data)
      wx.setStorageSync('session_id', res.data.session_id)
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1000
      })
      setTimeout(() => {
        _self.setData({
          isSubmit: false
        })
        let backURL = wx.getStorageSync('goBackPageURL');
        if (backURL && backURL !== 'pages/login/login') {
          backURL = '/' + backURL
          wx.reLaunch({
            url: backURL
          })
        } else {
          wx.reLaunch({
            url: '/pages/index/index'
          })
        }
      }, 1000);
    }).catch(err => {
      _self.setData({
        isSubmit: false
      })
      wx.showToast({
        title: err.data.msg ? err.data.msg : '网络连接异常，请稍后重试',
        icon: 'none',
        duration: 1000
      })
    })
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
    this.init();
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
})