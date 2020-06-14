// pages/order/order.js
var shopApi = require('../../http/shopApi.js').default;
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
    // "logisticsStatus": "string",物流状态 1-待发货 2-待收货 3-确认收货
    // "orderPayState": "string",支付状态 1-未支付，2-已支付
    // "orderState": "string",订单状态 1-正常 2-取消 3-退货/换货 4-已完成
    // 订单状态为1（正常），而且支付状态为1（未支付），而且物流状态为2（待收货）的才能显示“立即支付”按钮进行支付
    // 订单状态为1（正常），而且支付状态为1（未支付），而且物流状态为1（待发货）的才能显示“补单”按钮进行补单
   */
  data: {
    classList: [], // 大分类
    curClass: {}, // 当前大分类
    curNavIitem: {
      text: '全部',
      index: 1,
      orderState: ''
    },
    isClick: false,
    navs: [
      {
        text: '全部',
        index: 1,
        orderState: ''
      }, 
      {
        // text: '待发货',
        text: '待处理',
        index: 2,
        logisticsStatus: 1
      }, 
      {
        // text: '待收货',
        text: '已处理',
        index: 3,
        logisticsStatus: 2
      }, 
      {
        text: '待付款',
        index: 4,
        orderPayState: 1
      }, 
      // {
      //   text: '已付款',
      //   index: 5,
      //   orderPayState: 2
      // }, 
      // {
      //   text: '退货/退款',
      //   index: 6,
      //   orderState: 3
      // }
    ],
    orderList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //通过id获取组件component
    this.loginDialog = this.selectComponent("#loginDialog")

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
      this.loginDialog.closeLoginTip(); // 调用组件方法
      this.getShopClass();
    } else {
      // wx.redirectTo({
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
  // onShareAppMessage: function() {

  // },
  // 获取大分类
  getShopClass: function () {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    shopApi.shopClass()
      .then((res) => {
        console.log('获取大分类数据成功', res);
        // wx.hideLoading();
        this.setData({
          classList: res.data ? res.data : [],
          curClass: res.data && res.data.length > 0 ? res.data[0] : {}
        })
        this.getData();
      })
      .catch((error) => {
        console.log('获取大分类数据失败', error);
        // wx.hideLoading();
        wx.showToast({
          title: error.message ? error.message : '获取大分类数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },
  // 切换大分类
  handleChangeClass: function (e) {
    console.log(e.currentTarget.dataset)
    let { item } = e.currentTarget.dataset;
    if (item.id == this.data.curClass.id) {
      return
    }
    this.setData({
      curClass: item
    });
    this.getData();
  },
  
  // 获取订单数据
  getData: function () {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    var params = {
      shopClassId: this.data.curClass.id, // 新增大分类id字段
      userId: getApp().globalData.userInfo.id
    }
    if (this.data.curNavIitem.hasOwnProperty("orderState")) {
      params.orderState = this.data.curNavIitem.orderState;
    }
    if (this.data.curNavIitem.hasOwnProperty("logisticsStatus")) {
      params.logisticsStatus = this.data.curNavIitem.logisticsStatus;
    }
    if (this.data.curNavIitem.hasOwnProperty("orderPayState")) {
      params.orderPayState = this.data.curNavIitem.orderPayState;
    }
    shopApi.getOrder(params)
      .then((res) => {
        console.log('获取订单数据成功', res);
        // wx.hideLoading();
        var data = res.data ? res.data : [];
        for (var i = 0; i < data.length; i++) {
          data[i].totalPriceNum = parseFloat(data[i].freight) + parseFloat(data[i].totalSum);
          data[i].createTimeFormat = data[i].createTime ? util.formatTimeSubstr(data[i].createTime) : '';
          data[i].playTimeFormat = data[i].playTime ? util.formatTimeSubstr(data[i].playTime) : '';
          data[i].sendTimeFormat = data[i].sendTime ? util.formatTimeSubstr(data[i].sendTime) : '';
        }
        console.log(data)
        this.setData({
          orderList: data,
          isClick: false
        })
      })
      .catch((error) => {
        console.log('获取订单数据失败', error);
        // wx.hideLoading();
        this.setData({
          isClick: false
        })
        wx.showToast({
          title: error.message ? error.message : '获取订单数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 切换订单列表筛选
  changeList(e) {
    console.log(e.target.dataset)
    let { item } = e.target.dataset;
    if (this.data.isClick || item.index == this.data.curNavIitem.index) {
      return
    }
    this.setData({
      curNavIitem: item,
      isClick: true
    });
    this.getData();
  },

  // 去下单
  goBuy: function () {
    getApp().globalData.curBigClassData = this.data.curClass;
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  // 跳转订单详情
  goDetail: function (e) {
    console.log(e.currentTarget.dataset)
    let { item } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?orderId=' + item.id + '&shopClassId=' + this.data.curClass.id
    })
  },

  // 补单
  supplyOrder: function (e) {
    console.log(e.currentTarget.dataset)
    let { item } = e.currentTarget.dataset;
    getApp().globalData.supplyOrderData = item;
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  // 取消订单
  cancelOrder: function (e) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let { id } = e.currentTarget.dataset.item;
    var params = {
      id: id,
      shopClassId: this.data.curClass.id, // 新增大分类id字段
    }
    shopApi.orderDelete(params)
      .then((res) => {
        console.log('取消订单数据成功', res);
        wx.hideLoading();
        this.getData();
      })
      .catch((error) => {
        console.log('取消订单数据失败', error);
        wx.hideLoading();
        this.setData({
          isClick: false
        })
        wx.showToast({
          title: error.message ? error.message : '操作失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 退货退款
  returnOrder: function (e) {
    console.log(e.currentTarget.dataset)
    let { item } = e.currentTarget.dataset;
    this.editOrder(item, 3);
  },

  // 再来一单
  againOrder: function (e) {
    console.log(e.currentTarget.dataset)
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  // 确认收货
  takeOrder: function (e) {
    console.log(e.currentTarget.dataset)
    let { item } = e.currentTarget.dataset;
    this.editOrder(item, 4);
  },
  // 修改订单数据
  editOrder: function (item, state) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var params = {
      id: item.id,
      shopClassId: this.data.curClass.id, // 新增大分类id字段
      orderState: state
    }
    shopApi.orderUpdate(params)
      .then((res) => {
        console.log('修改订单数据成功', res);
        wx.hideLoading();
        this.getData();
      })
      .catch((error) => {
        console.log('修改订单数据失败', error);
        wx.hideLoading();
        this.setData({
          isClick: false
        })
        wx.showToast({
          title: error.message ? error.message : '操作失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 立即支付
  payOrder: function (e) {
    console.log(e.currentTarget.dataset)
    let { item } = e.currentTarget.dataset;
    this.getPayParams(item);
  },

  // 获取支付参数
  getPayParams: function (orderData) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.login({
      success: (res) => {
        console.log('微信登陆成功', res)
        if (res.code) {
          var params = {
            money: orderData.totalPriceNum, 
            // money: '0.01', // 测试使用
            orderNum: orderData.orderNo,
            code: res.code,
            userId: getApp().globalData.userInfo.id
          }
          shopApi.payParams(params)
            .then((res) => {
              console.log('获取支付参数成功', res);
              wx.hideLoading();
              if (res.data && res.data.timeStamp && res.data.nonceStr && res.data.package && res.data.paySign) {
                this.payMoney(res.data, orderData.id)
              } else {
                wx.showToast({
                  title: '支付参数不全，无法进行微信支付',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
            .catch((error) => {
              console.log('获取支付参数失败', error);
              wx.hideLoading();
              wx.showToast({
                title: error.message ? error.message : '获取支付参数失败，无法进行微信支付',
                icon: 'none',
                duration: 2000
              })
            })
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '微信登录出错，无法进行微信支付',
            icon: 'none'
          });
        }
      },
      fail: (res) => {
        wx.hideLoading();
        wx.showToast({
          title: '微信登录出错，无法进行微信支付',
          icon: 'none'
        });
      }
    });
  },
  // 微信支付
  payMoney: function (data, orderId) {
    let _self = this;
    wx.requestPayment({
      'timeStamp': data.timeStamp,
      'nonceStr': data.nonceStr,
      'package': data.package,
      'signType': 'MD5',
      'paySign': data.paySign,
      success: res => {
        console.log('支付成功', res)
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(() => {
          // 跳转支付成功页面
          wx.navigateTo({
            url: '/pages/paySuccess/paySuccess?orderId=' + orderId
          })
        }, 1000);
      },
      fail: res => {
        // 用户取消支付/支付失败
        console.log('支付失败', res)
        wx.showToast({
          title: res.errMsg ? res.errMsg : '支付失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
})