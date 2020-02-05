// pages/shippingAddress/shippingAddress.js
var util = require('../../utils/util.js');
var shopApi = require('../../http/shopApi.js').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  editAddress: function(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../addAddress/addAddress?id=' + id,
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

  // 获取数据
  getData: function() {
    this.getAddressList();
  },

  // 获取列表
  getAddressList: function() {
    shopApi.addressList().then((res) => {
      res.data.forEach(function(item) {
        item.addresses = item.regional.replace(/\,/g, '') + item.addresses;
      })
      this.setData({
        list: res.data
      });
    }).catch((error) => {
      console.log(error);
    })
  }
})