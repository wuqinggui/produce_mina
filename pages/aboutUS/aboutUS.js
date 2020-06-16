// pages/aboutUS/aboutUS.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //通过id获取组件component
    // this.loginDialog = this.selectComponent("#loginDialog")

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
    let sj_userId = wx.getStorageSync('sj_userId')
    if (sj_userId) {
      // this.loginDialog.closeLoginTip(); // 调用组件方法
      this.getData();
    } else {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      // this.loginDialog.showLoginTip(); // 调用组件方法
    }
  },

  // 组件回调方法
  // loginCallBack: function (e) {
  //   console.log('登陆弹框回调', e)
  //   this.onShow();
  // },

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

  // },
  
  // 获取数据
  getData: function () {

  }
})