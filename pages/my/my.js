// pages/my/my.js
var userApi = require('../../http/userApi.js').default;
var shopApi = require('../../http/shopApi.js').default;
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopId: '',
    userId: '',
    userInfo: {},
    list: [
      {
        text: '商户管理',
        url: '/pages/shopManage/shopManage',
        num: 0
      }, 
      {
        text: '员工管理',
        url: '/pages/staffManage/staffManage',
        num: 1
      }, 
      {
        text: '买家管理申请',
        url: '/pages/applySettled/applySettled',
        num: 2
      }, 
      // {
      //   text: '关于我们',
      //   url: '',
      //   // url: '/pages/aboutUS/aboutUS',
      //   num: 0
      // }, 
      // {
      //   text: '客服',
      //   url: '',
      //   // url: '/pages/service/service',
      //   num: 0
      // }, 
      {
        text: '设置',
        url: '/pages/set/set',
        num: 3
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
      this.setData({
        userId: sj_userId
      });
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
// 获取商户id
getShopId: function() {
  let params = {
    userId: this.data.userId
  }
  shopApi.findShopByUserId(params).then((res) => {
    if (res.data && res.data.id) {
      wx.setStorageSync('shopId',res.data.id);
      this.setData({
        shopId: res.data.id
      });
    }
  }).catch((err) => {
    wx.showToast({
      title: err.message ? err.message : '获取数据失败',
      icon: 'none'
    });
  })
},
  // 获取用户信息
  getData: function () {
    this.setData({
      userInfo: getApp().globalData.userInfo
    })
    this.getShopId();
    // console.log('用户信息', this.data.userInfo)
  },

  // 页面跳转
  navigateTo: function(e) {
    let { url, text, num} = e.currentTarget.dataset;
    if(num == 0 || num == 1) {
      if(this.data.shopId) {
        wx.navigateTo({
          url: url,
        })
      } else {
        wx.showToast({
          title: '暂无商户,请先申请买家管理',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      wx.navigateTo({
        url: url,
      })
    }
    // if (url) {
    //   wx.navigateTo({
    //     url: url,
    //   })
    // } else {
    //   wx.showToast({
    //     title: '暂无设计' + text + '页面',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
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