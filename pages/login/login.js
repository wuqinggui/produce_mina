var userApi = require('../../http/userApi.js').default;
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '', // 用户名
    password: '' // 密码
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
  onShareAppMessage: function () {

  },
  
  bindKeyUserName: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  bindKeyPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登陆
  login: function () {
    if (util.isBlank(this.data.userName)) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      });
      return;
    } else if (util.isBlank(this.data.password)) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return;
    }
    wx.showLoading({
      title: '登录中',
    });
    userApi.login({
      userName: this.data.userName,
      password: this.data.password
    })
    .then((res) => {
      console.log('登陆成功', res)
      this.getToken(res.data);
    })
    .catch((error) => {
      console.log('登陆失败', error)
      wx.hideLoading();
      wx.showToast({
        title: error.message ? error.message : '登陆失败',
        icon: 'none'
      });
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
      setTimeout(() => {
        wx.navigateBack();
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
})