// pages/orderSubmit/orderSubmit.js
var shopApi = require('../../http/shopApi.js').default;
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // freightPrice: 0, // 运费
    totalPrice: 0, // 合计价格
    submitCarData: {}, // 立即下单的购物车数据
    supplyOrderData: {}, // 补单的订单信息
    isSupplyOrder: false, // 是否补单
    isCanPay: false, // 是否可以下单/补单
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
    // 判断是否补单
    if (getApp().globalData.submitCarData.shopId && getApp().globalData.supplyOrderData.shopId &&  getApp().globalData.submitCarData.shopId == getApp().globalData.supplyOrderData.shopId) {
      // 补单
      this.setData({
        submitCarData: getApp().globalData.submitCarData,
        supplyOrderData: getApp().globalData.supplyOrderData,
        isSupplyOrder: true
      })
    } else {
      // 下单
      getApp().globalData.supplyOrderData = {}; // 清空补单信息
      var data = getApp().globalData.submitCarData;
      if (data.address && data.address.hasOwnProperty("regional") && data.address.hasOwnProperty("addresses")) {
        data.address.addresses = data.address.regional.replace(/\,/g, '') + data.address.addresses;
      }
      this.setData({
        submitCarData: data,
        supplyOrderData: {},
        isSupplyOrder: false
      })
    }
    this.countTotal();
    console.log('立即下单的购物车数据', this.data.submitCarData)
    console.log('补单信息', this.data.supplyOrderData)
  },
  
  // 去下单
  goBuy: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  // 合计商品价格
  countTotal: function () {
    var totalPrice = 0;
    var data = this.data.submitCarData;
    for (var j = 0; j < data.lstSubmit.length; j++) {
        // 选中的加上价格, 数量转整数，价格转浮点数类型
        totalPrice = totalPrice + parseInt(data.lstSubmit[j].number) * parseFloat(data.lstSubmit[j].commodity.price);
    }
    totalPrice = totalPrice.toFixed(2);
    this.setData({
      totalPrice: totalPrice
    })
  },
  // 确认下单
  sureSubmitOrder: function() {
    this.getTime(1);
  },
  sureSubmitOrder2: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var params = {
      addressId: this.data.submitCarData.address.id ? this.data.submitCarData.address.id : '',
      regionId: this.data.submitCarData.regionId,
      cartId: this.data.submitCarData.id,
      shopId: this.data.submitCarData.shopId,
      userId: getApp().globalData.userInfo.id
    }
    shopApi.addOrder(params)
      .then((res) => {
        console.log('下单成功', res);
        wx.hideLoading();
        wx.showToast({
          title: '下单成功',
          icon: 'success',
          duration: 1000
        })
        getApp().globalData.supplyOrderData = {}; // 清空补单信息
        if (res.data.id) {
          // 带上返回的订单id，关闭单前页面，跳转到订单详情页面，同时需要将全局立即下单的购物车数据submitCarData清空（原购物车数据不清空，服务端也不用清空对应购物车数据）
          getApp().globalData.submitCarData = {};
          wx.redirectTo({
            url: '/pages/orderDetail/orderDetail?orderId=' + res.data.id
          })
        } else {
          wx.showToast({
            title: '缺少返回订单信息',
            icon: 'none',
            duration: 2000
          })
        }
      })
      .catch((error) => {
        console.log('下单失败', error);
        wx.hideLoading();
        wx.showToast({
          title: error.message ? error.message : '操作失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 补单
  supplyOrder: function () {
    this.getTime(2);
  },
  supplyOrder2: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var params = {
      cartId: this.data.submitCarData.id,
      id: this.data.supplyOrderData.id
    }
    shopApi.orderUpdate(params)
      .then((res) => {
        console.log('补单成功', res);
        wx.hideLoading();
        wx.showToast({
          title: '补单成功',
          icon: 'success',
          duration: 1000
        })
        getApp().globalData.supplyOrderData = {}; // 清空补单信息
        if (res.data.id) {
          // 带上返回的订单id，关闭单前页面，跳转到订单详情页面，同时需要将全局立即下单的购物车数据submitCarData清空（原购物车数据不清空，服务端也不用清空对应购物车数据）
          getApp().globalData.submitCarData = {};
          wx.redirectTo({
            url: '/pages/orderDetail/orderDetail?orderId=' + res.data.id
          })
        } else {
          wx.showToast({
            title: '缺少返回订单信息',
            icon: 'none',
            duration: 2000
          })
        }
      })
      .catch((error) => {
        console.log('补单失败', error);
        wx.hideLoading();
        wx.showToast({
          title: error.message ? error.message : '操作失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 获取可下单的时间段
  getTime: function (type) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    shopApi.payTime()
      .then((res) => {
        console.log('获取可下单补单的时间段成功', res);
        wx.hideLoading();
        var data = res.data ? res.data : [];
        var date =  Date.parse(new Date()); // 当前时间
        var nowDate = util.formatTime(date, 1); // 当前时分秒
        var nowTime = util.formatTimeNumber(nowDate); // 时分秒转成时间戳
        this.setData({
          isCanPay: false
          // isCanPay: true // 测试时先跳过下单时间校验
        })
        for (var i = 0; i < data.length; i++) {
          data[i].beginTimeNumber = data[i].beginTime ? util.formatTimeNumber(data[i].beginTime) : 0;
          data[i].endTimeNumber = data[i].endTime ? util.formatTimeNumber(data[i].endTime) : 0;
          // 判断当前时间是否在可下单的时间段里面
          if (nowTime > data[i].beginTimeNumber && nowTime < data[i].endTimeNumber) {
            this.setData({
              isCanPay: true
            })
            break
          }
        }
        if (!this.data.isCanPay) {
          wx.showToast({
            title: '当前时间暂不开放下单/补单',
            icon: 'none',
            duration: 2000
          })
          return
        }
        if (type == 1) {
           this.sureSubmitOrder2();
        } else if (type == 2) {
          this.supplyOrder2();
        }
      })
      .catch((error) => {
        console.log('获取可下单补单的时间段失败', error);
        wx.hideLoading();
        wx.showToast({
          title: error.message ? error.message : '获取可下单补单的时间段请求失败',
          icon: 'none',
          duration: 2000
        })
      })
  },
})