// pages/orderSubmit/orderSubmit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuto: true, //高度
    freightPrice: 0, // 运费
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
  // 展示/隐藏部分内容
  changeHeight: function() {
    var isAuto = this.data.isAuto;
    this.setData({
      isAuto: !isAuto
    })
  },
  // 合计商品数量和价格
  countTotal: function () {
    // var num = 0;
    // var data = this.data.carList;
    // for (var i = 0; i < data.length; i++) {
    //   for (var j = 0; j < data[i].commodity.length; j++) {
    //     if (data[i].commodity[j].isSelect) {
    //       // 选中的加上价格, 数量转整数，价格转浮点数类型
    //       num = num + parseInt(data[i].commodity[j].shoppingcartintermediate.number) * parseFloat(data[i].commodity[j].specpricelst[0].price);
    //     }
    //   }
    // }
    // num = num.toFixed(2);
    // this.setData({
    //   totalPrice: num
    // })
    // wx.hideLoading();
  },
  // 确认下单
  sureSubmitOrder: function() {
    
  },
})