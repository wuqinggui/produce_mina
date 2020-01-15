// pages/applySettled/applySettled.js
import utils from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo: {
      shopName: '',
      mainProject: '',
      boss: '',
      cardId: '',
      cardDate: '',
      address: '',
      phone: '',
      verCode: '',
      isAccept: false
    }
  },
  // 店铺信息--下一步按钮
  formSubmit: function(e) {
    var formValue = e.detail.value;
    var radioVal = e.detail.value.accept;
    if(utils.isBlank(radioVal)) {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
    }
    for(var item in formValue) {
      
    }
  },
  // 选择总店地址
  selectCardDate: function () {

  },
  // 选择身份证期限
  selectAddress: function () {

  },
  // 发送验证码
  sendEMS: function() {

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

  }
})