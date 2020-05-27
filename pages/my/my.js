// pages/my/my.js
var userApi = require('../../http/userApi.js').default;
var shopApi = require('../../http/shopApi.js').default;
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopIds: [],
    userId: '',
    userInfo: {},
    list: [
      {
        show: true,
        text: '商户管理',
        url: '/pages/shopManage/shopManage',
        num: 0
      }, 
      {
        show: true,
        text: '员工管理',
        url: '/pages/staffManage/staffManage',
        num: 1
      }, 
      {
        show: true,
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
        show: true,
        text: '设置',
        url: '/pages/set/set',
        num: 3
      }
      // , {
      //   show: true,
      //   text: '去登陆',
      //   url: '/pages/login/login',
      //   num: 4
      // }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //通过id获取组件component
    this.loginDialog = this.selectComponent("#loginDialog")

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
      this.loginDialog.closeLoginTip(); // 调用组件方法
      let list = this.data.list;
      list[list.length-1].show = false;
      this.setData({
        userId: sj_userId,
        list: list
      });
      this.getData();
    } else {
      // wx.navigateTo({
      //   url: '/pages/login/login'
      // })
      this.loginDialog.showLoginTip(); // 调用组件方法
    }
  },

  // 组件回调方法
  loginCallBack: function (e) {
    console.log('登陆弹框回调', e)
    this.onShow();
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
  // onShareAppMessage: function () {

  // },
// 获取商户id
getShopId: function() {
  let params = {
    userId: this.data.userId
  }
  shopApi.getUserShop(params).then((res) => {
    this.setData({
      shopIds: res.data.length ? res.data : []
    });
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
      if(this.data.shopIds.length) {
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
})