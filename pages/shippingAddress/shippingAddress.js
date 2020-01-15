// pages/shippingAddress/shippingAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      name: '陈艺发',
      phone: '134503454501',
      address: '江苏省扬州市邗江区润扬广场小区13-7车库江苏省扬州市邗江区润扬广场小区13-7车库'
    }, {
      name: '陈艺发',
      phone: '134503454501',
      address: '江苏省扬州市邗江区润扬广场小区13-7车库江苏省扬州市邗江区润扬广场小区13-7车库'
    }, {
      name: '陈艺发',
      phone: '134503454501',
      address: '江苏省扬州市邗江区润扬广场小区13-7车库江苏省扬州市邗江区润扬广场小区13-7车库'
    }, {
      name: '陈艺发',
      phone: '134503454501',
      address: '江苏省扬州市邗江区润扬广场小区13-7车库江苏省扬州市邗江区润扬广场小区13-7车库'
      }, {
        name: '陈艺发',
        phone: '134503454501',
        address: '江苏省扬州市邗江区润扬广场小区13-7车库江苏省扬州市邗江区润扬广场小区13-7车库'
      }, {
        name: '陈艺发',
        phone: '134503454501',
        address: '江苏省扬州市邗江区润扬广场小区13-7车库江苏省扬州市邗江区润扬广场小区13-7车库'
      }, {
        name: '陈艺发',
        phone: '134503454501',
        address: '江苏省扬州市邗江区润扬广场小区13-7车库江苏省扬州市邗江区润扬广场小区13-7车库'
      }, {
        name: '陈艺发',
        phone: '134503454501',
        address: '江苏省扬州市邗江区润扬广场小区13-7车库江苏省扬州市邗江区润扬广场小区13-7车库'
      }]
  },
  editAddress: function() {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  add: function() {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})