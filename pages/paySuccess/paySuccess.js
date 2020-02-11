// pages/paySuccess/paySuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNo: '', // 支付成功的订单id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('支付成功options', options)
    this.setData({
      orderNo: options.orderNo
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
      // this.getData();
    } else {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
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

  // 查看订单详情
  goOrderDetail: function () {
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?orderNo=' + this.data.orderNo
    })
  },

  // 回到商城首页
  goHome: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
})