// pages/buyCar/buyCar.js
var shopApi = require('../../http/shopApi.js').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    buyList: []
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
      this.setData({
        isLoading: true
      })
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

  // 获取获取购物车店铺数据
  getData: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var userId = getApp().globalData.userInfo.id;
    var params = {
      userId: userId,
      type: 0
    }
    shopApi.carShop(params)
      .then((res) => {
        console.log('获取购物车商户数据成功', res);
        wx.hideLoading();
        this.setData({
          buyList: res.data ? res.data : [],
          isLoading: false
        })
      })
      .catch((error) => {
        console.log('获取购物车数据失败', error);
        wx.hideLoading();
        this.setData({
          buyList: [],
          isLoading: false
        })
        wx.showToast({
          title: error.message ? error.message : '获取购物车数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 跳转购物车详情
  toDetailPage: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/buyCarDetail/buyCarDetail?shopId=' + id
    })
  },

  // 去下单
  goBuy: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
})