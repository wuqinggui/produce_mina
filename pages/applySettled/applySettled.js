// pages/applySettled/applySettled.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 0,
    shopInfo: {
      shopName: '',
      mainProject: '',
      boss: '',
      cardId: '',
      cardDate: '',
      address: '',
      phone: '',
      verCode: '',
      isAccept: false,
      sendFlag: true,
      sendMsg: '发送验证码',
      time: 10
    }
  },
  // 店铺信息--下一步按钮
  formSubmit: function(e) {
    var formValue = e.detail.value;
    var radioVal = e.detail.value.accept[0];
    console.log(formValue);
    if(utils.isBlank(radioVal)) {
      wx.showToast({
        title: '请阅读并勾选商家入驻协议',
        icon: 'none',
        duration: 2000
      })
    }
    for(var item in formValue) {
      console.log(item);
    }
  },
  // 选择总店地址
  selectCardDate: function () {

  },
  // 选择身份证期限
  selectAddress: function () {

  },
  timeInterval: function() {
    var shopInfo = this.data.shopInfo;
    shopInfo.sendFlag = false;
    var timer = setInterval(() => {
      shopInfo.time--;
      shopInfo.sendMsg = shopInfo.time + ' 秒后重新发送';
      if (shopInfo.time == 0) {
        clearInterval(timer);
        shopInfo.sendMsg = '重新发送';
        shopInfo.time = 10;
        shopInfo.sendFlag = true;
      }
      this.setData({
        shopInfo: shopInfo
      })
    }, 1000)
  },
  // 发送验证码
  sendEMS: function() {
    var shopInfo = this.data.shopInfo;
    if (!shopInfo.sendFlag) { return }
    this.timeInterval();
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

  }
})