// pages/my/my.js
var userApi = require('../../http/userApi.js').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuthUserinfo: false, // wxml无法直接使用getApp().globalData.isAuthUserinfo
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

  navigateTo: function() {
    console.log(111);
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
    let { getOpenidEnd } = getApp().globalData;
    // 已微信登陆
    if (getOpenidEnd) {
      this.pageInit();
    } else {
      // 未微信登陆
      getApp().globalData.getOpenidCb = () => {
        this.pageInit();
      }
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

  // 页面初始化
  pageInit: function () {
    this.setData({
      isAuthUserinfo: getApp().globalData.isAuthUserinfo
    })
  },
  
  // 弹框式授权用户信息
  getUserInfo: function (e) {
    var _this = this;
    console.log(e.detail)
    let { errMsg, userInfo } = e.detail;
    switch (errMsg) {
      case 'getUserInfo:fail auth deny':
      case 'getUserInfo:fail:cancel to confirm login':
        break;
      default:
        // 必须是在用户已经授权的情况下调用
        wx.getUserInfo({
          success(res) {
            console.log('用户信息', res)
            // let params = Object.assign({}, res);
            // delete params['userInfo'];
            // delete params['errMsg'];
            // userApi.getUserInfo(params)
            //   .then((res2) => {
              getApp().getUserinfoSetting();
              getApp().saveUserinfo(res.userInfo);
              _this.setData({
                isAuthUserinfo: true
              })
              // })
              // .catch((error2) => {
              //   console.log(error2);
              // })
          },
          fail(error) {
            _this.setData({
              isAuthUserinfo: false
            })
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