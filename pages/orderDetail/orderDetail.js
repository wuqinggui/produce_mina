// pages/orderDetail/orderDetail.js
var shopApi = require('../../http/shopApi.js').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNo: '',
    orderData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('订单详情options', options)
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
      this.getData();
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
  
  // 获取订单数据
  getData: function () {
    wx.showLoading({
      title: '加载中',
    })
    var params = {
      orderState: '',
      orderNo: this.data.orderNo,
      userId: getApp().globalData.userInfo.id
    }
    shopApi.getOrder(params)
      .then((res) => {
        console.log('获取订单数据成功', res);
        wx.hideLoading();
        this.setData({
          orderData: res.data && res.data.length > 0 ? res.data[0] : {}
        })
      })
      .catch((error) => {
        console.log('获取订单数据失败', error);
        wx.hideLoading();
        wx.showToast({
          title: error.message ? error.message : '获取订单数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 补单
  supplyOrder: function () {
    
  },

  // 取消订单
  cancelOrder: function () {
    
  },

  // 退货退款
  returnOrder: function () {
    
  },

  // 再来一单
  againOrder: function () {
    
  },

  // 立即支付
  payOrder: function () {
    
  },

  // 确认收货
  takeOrder: function () {
    
  }
})