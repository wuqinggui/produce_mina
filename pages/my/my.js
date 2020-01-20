// pages/my/my.js
var userApi = require('../../http/userApi.js').default;
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    list: [
      {
        text: '店铺管理',
        url: '/pages/shopManage/shopManage',
        num: 5
      }, {
        text: '员工管理',
        url: '/pages/staffManage/staffManage',
        num: 0
      }, {
        text: '商家入驻申请',
        url: '/pages/applySettled/applySettled',
        num: 0
      }
      , {
        text: '关于我们',
        url: '',
        // url: '/pages/aboutUS/aboutUS',
        num: 0
      }, {
        text: '客服',
        url: '',
        // url: '/pages/service/service',
        num: 0
      }, {
        text: '设置',
        url: '/pages/set/set',
        num: 0
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

  // 获取用户信息
  getData: function () {
    
  },

  // 页面跳转
  navigateTo: function(e) {
    let { url,text  } = e.currentTarget.dataset;
    if (url) {
      wx.navigateTo({
        url: url,
      })
    } else {
      wx.showToast({
        title: '暂无设计' + text + '页面',
        icon: 'none',
        duration: 2000
      })
    }
  },
  
  // 弹框式授权用户信息
  // getUserInfo: function (e) {
  //   var _this = this;
  //   console.log(e.detail)
  //   let { errMsg, userInfo } = e.detail;
  //   switch (errMsg) {
  //     case 'getUserInfo:fail auth deny':
  //     case 'getUserInfo:fail:cancel to confirm login':
  //       break;
  //     default:
  //       // 必须是在用户已经授权的情况下调用
  //       wx.getUserInfo({
  //         success(res) {
  //           console.log('用户信息', res)
  //           // let params = Object.assign({}, res);
  //           // delete params['userInfo'];
  //           // delete params['errMsg'];
  //           // userApi.getUserInfo(params)
  //           //   .then((res2) => {
  //             getApp().getUserinfoSetting();
  //             getApp().saveUserinfo(res.userInfo);
  //             _this.setData({
  //               isAuthUserinfo: true
  //             })
  //             // })
  //             // .catch((error2) => {
  //             //   console.log(error2);
  //             // })
  //         },
  //         fail(error) {
  //           wx.showToast({
  //             title: '授权用户信息失败，请重试',
  //             icon: 'none'
  //           });
  //         }
  //       });
  //       break;
  //   }
  // },
})