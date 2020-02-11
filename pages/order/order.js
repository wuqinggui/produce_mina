// pages/order/order.js
var shopApi = require('../../http/shopApi.js').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curNavIitem: {
      text: '全部',
      index: 1,
      orderState: ''
    },
    isClick: false,
    navs: [
      {
        text: '全部',
        index: 1,
        orderState: ''
      }, 
      {
        text: '待发货',
        index: 2,
        orderState: 1
      }, 
      {
        text: '待收货',
        index: 3,
        orderState: 2
      }, 
      {
        text: '待付款',
        index: 4,
        orderPayState: 0,
        orderState: ''
      }, 
      {
        text: '已付款',
        index: 5,
        orderPayState: 1,
        orderState: ''
      }, 
      {
        text: '退货/退款',
        index: 6,
        orderState: 3
      }
    ],
    orderList: []
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

  },
  
  // 获取订单数据
  getData: function () {
    wx.showLoading({
      title: '加载中',
    })
    var params = {
      orderState: this.data.curNavIitem.orderState,
      userId: getApp().globalData.userInfo.id
    }
    if (this.data.curNavIitem.hasOwnProperty("orderPayState")) {
      // 是否传待支付已支付的支付状态字段
      params.orderPayState = this.data.curNavIitem.orderPayState;
    }
    shopApi.getOrder(params)
      .then((res) => {
        console.log('获取订单数据成功', res);
        wx.hideLoading();
        this.setData({
          orderList: res.data ? res.data : [],
          isClick: false
        })
      })
      .catch((error) => {
        console.log('获取订单数据失败', error);
        wx.hideLoading();
        this.setData({
          isClick: false
        })
        wx.showToast({
          title: error.message ? error.message : '获取订单数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 切换订单列表筛选
  changeList(e) {
    console.log(e.target.dataset)
    let { item } = e.target.dataset;
    if (this.data.isClick || item.index == this.data.curNavIitem.index) {
      return
    }
    this.setData({
      curNavIitem: item,
      isClick: true
    });
    this.getData();
  },

  // 去下单
  goBuy: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  // 跳转订单详情
  goDetail: function (e) {
    console.log(e.currentTarget.dataset)
    let { item } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?orderNo=' + item.orderNo
    })
  },

  // 补单
  supplyOrder: function (e) {
    console.log(e.currentTarget.dataset)
  },

  // 取消订单
  cancelOrder: function (e) {
    console.log(e.currentTarget.dataset)
  },

  // 退货退款
  returnOrder: function (e) {
    console.log(e.currentTarget.dataset)
  },

  // 再来一单
  againOrder: function (e) {
    console.log(e.currentTarget.dataset)
  },

  // 立即支付
  payOrder: function (e) {
    console.log(e.currentTarget.dataset)
  },

  // 确认收货
  takeOrder: function (e) {
    console.log(e.currentTarget.dataset)
  }
})