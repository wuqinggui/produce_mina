// pages/orderSubmit/orderSubmit.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuto: true //高度
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
  // 跳转修改收货人信息
  updateInfo: function() {
    wx.navigateTo({
      url: '../shippingAddress/shippingAddress',
    })
  },
  // 确认下单
  bindCheckout: function() {
    // wx.navigateTo({
    //   url: '../',
    // })
  },
  changeWidth: function() {
    var isAuto = this.data.isAuto;
    this.setData({
      isAuto: !isAuto
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let sj_userId = wx.getStorageSync('sj_userId')
    if (sj_userId) {
      this.getData();
    } else {
      let url = util.getCurrentPageUrl();
      wx.setStorageSync('goBackPageURL', url)
      wx.reLaunch({
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
      cartObj: [{
        id: 1,
        storeName: '水果旗舰店1',
        selectedAll: true,
        carts: [{
          objectId: 1,
          selected: true,
          quantity: 1,
          goods: {
            objectId: 1,
            avatar: '../../images/cai.jpg',
            title: '小宝贝',
            price: 12,
            type: '上品'
          }
        }, {
          objectId: 1,
          selected: true,
          quantity: 10,
          goods: {
            objectId: 2,
            avatar: '../../images/cai.jpg',
            title: '小宝贝',
            price: 12,
            type: '上品'
          }
        }, {
          objectId: 1,
          selected: true,
          quantity: 10,
          goods: {
            objectId: 3,
            avatar: '../../images/cai.jpg',
            title: '小宝贝',
            price: 12,
            type: '上品'
          }
        }]
      }, {
        id: 2,
        storeName: '水果旗舰店2',
        selectedAll: true,
        carts: [{
          objectId: 1,
          selected: true,
          quantity: 10,
          goods: {
            objectId: 4,
            avatar: '../../images/cai.jpg',
            title: '小宝贝',
            price: 12,
            type: '上品'
          }
        }, {
          objectId: 1,
          selected: true,
          quantity: 10,
          goods: {
            objectId: 5,
            avatar: '../../images/cai.jpg',
            title: '小宝贝',
            price: 12,
            type: '上品'
          }
        }, {
          objectId: 1,
          selected: true,
          quantity: 10,
          goods: {
            objectId: 6,
            avatar: '../../images/cai.jpg',
            title: '小宝贝',
            price: 12,
            type: '上品'
          }
        }]
      }
      ]
    })
  }
})