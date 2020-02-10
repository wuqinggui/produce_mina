// pages/orderSubmit/orderSubmit.js
var shopApi = require('../../http/shopApi.js').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    freightPrice: '0.00', // 运费
    totalNum: 0, // 合计商品数量
    totalPrice: 0, // 合计价格
    addresseeData: {}, // 收件人信息
    submitCarData: {}, // 立即下单的购物车数据
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
  
  // 获取数据
  getData: function () {
    this.setData({
      submitCarData: getApp().globalData.submitCarData,
      addresseeData: getApp().globalData.addresseeData
    })
    this.countTotal();
    console.log('立即下单的购物车数据', this.data.submitCarData)
    console.log('收货人信息', this.data.addresseeData)
  },
  
  // 跳转收货人信息
  changeAddresseeData: function() {
    var id = this.data.addresseeData.id ? this.data.addresseeData.id : '';
    wx.navigateTo({
      url: '/pages/shippingAddress/shippingAddress?isSelect=1&addressId=' + id,
    })
  },
  // 去下单
  goBuy: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  // 合计商品数量和价格
  countTotal: function () {
    var totalNum = 0;
    var totalPrice = 0;
    var data = this.data.submitCarData;
    for (var j = 0; j < data.lstSubmit.length; j++) {
        // 选中的加上价格, 数量转整数，价格转浮点数类型
        totalNum = totalNum + parseInt(data.lstSubmit[j].number)
        totalPrice = totalPrice + parseInt(data.lstSubmit[j].number) * parseFloat(data.lstSubmit[j].specprice.price);
    }
    totalPrice = totalPrice.toFixed(2);
    this.setData({
      totalNum: totalNum,
      totalPrice: totalPrice
    })
  },
  // 确认下单
  sureSubmitOrder: function() {
    if (!this.data.addresseeData.id) {
      wx.showToast({
        title: '请选择收件人信息',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    var params = {
      cartId: this.data.submitCarData.id,
      actualNumber: this.data.totalNum,
      number: this.data.totalNum,
      totalSum: this.data.totalPrice,
      addressId: this.data.addresseeData.id,
      freight: this.data.freightPrice,
      userId: getApp().globalData.userInfo.id
    }
    shopApi.addOrder(params)
      .then((res) => {
        console.log('下单成功', res);
        wx.hideLoading();
        // 带上返回的订单id，关闭单前页面，跳转到支付成功页面，同时需要将全局立即下单的购物车数据submitCarData清空（原购物车数据不清空，服务端也不用清空对应购物车数据）
        // if (res.data.orderId) {
        //   getApp().globalData.submitCarData = {};
        //   wx.redirectTo({
        //     url: '/pages/paySuccess/paySuccess?orderId=' + res.data.orderId,
        //   })
        // }
      })
      .catch((error) => {
        console.log('下单失败', error);
        wx.hideLoading();
        wx.showToast({
          title: error.message ? error.message : '操作失败',
          icon: 'none',
          duration: 2000
        })
      })
  },
})