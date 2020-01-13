// pages/my/my.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    list: [
      {
        text: '店铺管理',
        tip: '',
      }, {
        text: '员工管理',
        tip: '1380043433',
      }, {
        text: '商家入驻申请',
        tip: '',
      }, {
        text: '关于商城',
        tip: '',
      }, {
        text: '关于商城',
        tip: '',
      }, {
        text: '关于商城',
        tip: '',
      }
    ]
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
    var _this = this;
    wx.getUserInfo({
      success: function (res) {
        _this.setData({
          userInfo: res.userInfo
        })
      }
    })
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

  getUserInfo: function (e) {
    let { errMsg, userInfo } = e.detail;
    switch (errMsg) {
      case 'getUserInfo:fail auth deny':
      case 'getUserInfo:fail:cancel to confirm login':
        break;
      default:
        // 必须是在用户已经授权的情况下调用
        wx.getUserInfo({
          success(res) {
            let params = Object.assign({}, res);
            delete params['userInfo'];
            delete params['errMsg'];
            userApi.getUserinfo(params)
              .then((res2) => {
                authLogic.getUserinfoSetting();
                wx.setStorage({
                  key: 'authUserinfo',
                  data: res
                });
              })
              .catch((error2) => {
                console.log(error2);
              })
          },
          fail(error) {
            wx.showToast({
              title: '授权用户信息失败，请重试',
              icon: 'none'
            });
          }
        });
        break;
    }
  },
})