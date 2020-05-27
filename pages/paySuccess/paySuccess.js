// pages/paySuccess/paySuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '', // 支付成功的订单id
    isBack: '', // 判断点击“查看订单”是进入订单详情页面还是返回订单详情页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //通过id获取组件component
    this.loginDialog = this.selectComponent("#loginDialog")
    console.log('支付成功options', options)
    this.setData({
      orderId: options.orderId,
      isBack: options.isBack ? options.isBack : ''
    })
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
      this.loginDialog.closeLoginTip(); // 调用组件方法
      // this.getData();
    } else {
      // wx.navigateTo({
      //   url: '/pages/login/login'
      // })
      this.loginDialog.showLoginTip(); // 调用组件方法
    }
  },

  // 组件回调方法
  loginCallBack: function (e) {
    console.log('登陆弹框回调', e)
    this.onShow();
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

  // },

  // 查看订单详情
  goOrderDetail: function () {
    if (this.data.isBack && this.data.isBack == 1) {
      // 返回订单详情页面
      wx.navigateBack();
    } else {
      // 跳转订单详情页面
      wx.navigateTo({
        url: '/pages/orderDetail/orderDetail?orderId=' + this.data.orderId
      })
    }
  },

  // 回到商城首页
  goHome: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
})