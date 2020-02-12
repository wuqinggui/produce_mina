// pages/orderDetail/orderDetail.js
var shopApi = require('../../http/shopApi.js').default;
Page({

  /**
   * 页面的初始数据
    // "logisticsStatus": "string",物流状态 1-待发货 2-待收货 3-确认收货
    // "orderPayState": "string",支付状态 1-未支付，2-已支付
    // "orderState": "string",订单状态 1-正常 2-取消 3-退货/换货 4-已完成
   */
  data: {
    orderId: '',
    orderData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('订单详情options', options)
    this.setData({
      orderId: options.orderId
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
      id: this.data.orderId
    }
    shopApi.getOrder(params)
      .then((res) => {
        console.log('获取订单数据成功', res);
        wx.hideLoading();
        res.data.forEach(function(item) {
          item.address.addresses = item.address.regional.replace(/\,/g, '') + item.address.addresses;
        })
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
    getApp().globalData.supplyOrderData = this.data.orderData;
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  // 取消订单
  cancelOrder: function () {
    var item = this.data.orderData;
    this.editOrder(item, 2);
  },

  // 退货退款
  returnOrder: function () {
    var item = this.data.orderData;
    this.editOrder(item, 3);
  },

  // 再来一单
  againOrder: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  // 立即支付
  payOrder: function () {
    
  },

  // 确认收货
  takeOrder: function () {
    var item = this.data.orderData;
    this.editOrder(item, 4);
  },

  // 修改订单数据
  editOrder: function (item, state) {
    wx.showLoading({
      title: '加载中',
    })
    var params = {
      id: item.id,
      orderState: state
    }
    shopApi.orderUpdate(params)
      .then((res) => {
        console.log('修改订单数据成功', res);
        wx.hideLoading();
        this.getData();
      })
      .catch((error) => {
        console.log('修改订单数据失败', error);
        wx.hideLoading();
        this.setData({
          isClick: false
        })
        wx.showToast({
          title: error.message ? error.message : '操作失败',
          icon: 'none',
          duration: 2000
        })
      })
  } 
})