// pages/shopManage/shopManage.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    showOneButtonDialog: false,
    oneButton: [{ text: '添加' }],
    list: [{
      name: '小港',
      phone: '13169418600',
      shopName: '广州天河百货分店',
      remark: '备注',
    }, {
        name: '小港',
        phone: '13169418600',
        shopName: '广州天河百货分店',
        remark: '备注',
      }, {
        name: '小港',
        phone: '13169418600',
        shopName: '广州天河百货分店',
        remark: '备注',
      }, {
        name: '小港',
        phone: '13169418600',
        shopName: '广州天河百货分店',
        remark: '备注',
      }, {
        name: '小港',
        phone: '13169418600',
        shopName: '广州天河百货分店',
        remark: '备注',
      }]
  },
  tapDialogButton(e) {
    this.setData({
      showOneButtonDialog: false
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  addShop: function() {
    this.setData({
      showOneButtonDialog: true
    })
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

  }
})