// pages/orderSubmit/orderSubmit.js
var shopApi = require('../../http/shopApi.js').default;
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    freightPrice: '0.00', // 运费
    totalPrice: 0, // 合计价格
    addresseeData: {}, // 收件人信息
    submitCarData: {}, // 立即下单的购物车数据
    supplyOrderData: {}, // 补单的订单信息
    isSupplyOrder: false, // 是否补单
    isCanPay: false, // 是否可以下单支付
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
    // 关闭页面清空收件人信息
    getApp().globalData.addresseeData = {};
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
    if (getApp().globalData.submitCarData.shopid && getApp().globalData.supplyOrderData.shopid &&  getApp().globalData.submitCarData.shopid == getApp().globalData.supplyOrderData.shopid) {
      this.setData({
        submitCarData: getApp().globalData.submitCarData,
        supplyOrderData: getApp().globalData.supplyOrderData,
        addresseeData: getApp().globalData.supplyOrderData.address,
        isSupplyOrder: true
      })
    } else {
      this.setData({
        submitCarData: getApp().globalData.submitCarData,
        addresseeData: getApp().globalData.addresseeData,
        supplyOrderData: {},
        isSupplyOrder: false
      })
    }
    this.countTotal();
    this.getTime();
    console.log('立即下单的购物车数据', this.data.submitCarData)
    console.log('收货人信息', this.data.addresseeData)
    console.log('补单信息', this.data.supplyOrderData)
  },

  // 获取可支付下单的时间段
  getTime: function (isNext, funName) {
    wx.showLoading({
      title: '加载中',
    })
    shopApi.payTime()
      .then((res) => {
        console.log('获取可支付下单的时间段成功', res);
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
          // 判断当前时间是否在可下单支付的时间段里面
          if (nowTime > data[i].beginTimeNumber && nowTime < data[i].endTimeNumber) {
            this.setData({
              isCanPay: true
            })
            break
          }
        }
        if (!this.data.isCanPay) {
          wx.showToast({
            title: '当前时间不开放下单支付',
            icon: 'none',
            duration: 2000
          })
          return
        }
        if (isNext && isNext == 1) {
          if (funName && funName == 1) {
            this.sureSubmitOrder2();
          } else if (funName && funName == 2) {
            this.supplyOrder2();
          }
        }
      })
      .catch((error) => {
        console.log('获取可支付下单的时间段失败', error);
        wx.hideLoading();
        wx.showToast({
          title: error.message ? error.message : '获取可支付下单的时间段请求失败',
          icon: 'none',
          duration: 2000
        })
      })
  },
  
  // 跳转收货人信息
  changeAddresseeData: function() {
    if (this.data.isSupplyOrder) {
      // 补单不能选择收件人信息
      return
    }
    var id = this.data.addresseeData.id ? this.data.addresseeData.id : '';
    wx.navigateTo({
      url: '/pages/shippingAddress/shippingAddress?isSelect=1&addressId=' + id,
    })
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
        totalPrice = totalPrice + parseInt(data.lstSubmit[j].number) * parseFloat(data.lstSubmit[j].specprice.price);
    }
    totalPrice = totalPrice.toFixed(2);
    this.setData({
      totalPrice: totalPrice
    })
  },
  // 确认下单
  sureSubmitOrder: function() {
    if (this.data.orderId) {
      // 已生成订单，防止重复提交
      return
    }
    if (!this.data.addresseeData.id) {
      wx.showToast({
        title: '请选择收件人信息',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.getTime(1, 1);
  },
  sureSubmitOrder2: function () {
    wx.showLoading({
      title: '加载中',
    })
    var params = {
      cartId: this.data.submitCarData.id,
      addressId: this.data.addresseeData.id,
      shopid: this.data.submitCarData.shopid,
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
        if (res.data.id && res.data.orderNo) {
          this.setData({
            orderId: res.data.id
          })
          this.getPayParams(res.data);
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
    if (this.data.orderId) {
      // 已生成订单，防止重复提交
      return
    }
    this.getTime(1, 2);
  },
  supplyOrder2: function () {
    wx.showLoading({
      title: '加载中',
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
        if (res.data.id && res.data.orderNo) {
          this.setData({
            orderId: res.data.id
          })
          this.getPayParams(res.data);
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
  // 获取支付参数
  getPayParams: function (data) {
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success: (res) => {
        console.log('微信登陆成功', res)
        if (res.code) {
          var params = {
            money: data.totalSum, 
            orderNum: data.orderNo,
            code: res.code,
            userId: getApp().globalData.userInfo.id
          }
          shopApi.payParams(params)
            .then((res) => {
              console.log('获取支付参数成功', res);
              wx.hideLoading();
              if (res.data && res.data.timeStamp && res.data.nonceStr && res.data.package && res.data.paySign) {
                this.payMoney(res.data)
              } else {
                wx.showToast({
                  title: '支付参数不全，无法进行微信支付',
                  icon: 'none',
                  duration: 2000
                })
                this.goNextPage();
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
              this.goNextPage();
            })
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '微信登录出错，无法进行微信支付',
            icon: 'none'
          });
          this.goNextPage();
        }
      },
      fail: (res) => {
        wx.hideLoading();
        wx.showToast({
          title: '微信登录出错，无法进行微信支付',
          icon: 'none'
        });
        this.goNextPage();
      }
    });
  },
  // 微信支付
  payMoney: function (data) {
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
          _self.goNextPage(1);
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
        _self.goNextPage();
      }
    })
  },
  // 跳转支付成功页面
  // 带上返回的订单id，关闭单前页面，跳转到支付成功页面，同时需要将全局立即下单的购物车数据submitCarData和收件人信息addresseeData清空（原购物车数据不清空，服务端也不用清空对应购物车数据）
  goNextPage: function (type) {
    getApp().globalData.submitCarData = {};
    getApp().globalData.addresseeData = {};
    if (type && type == 1) {
      // 支付成功跳转支付成功页面
      wx.redirectTo({
        url: '/pages/paySuccess/paySuccess?orderId=' + this.data.orderId
      })
    } else {
      // 支付失败跳转订单详情页面
      wx.redirectTo({
        url: '/pages/orderDetail/orderDetail?orderId=' + this.data.orderId
      })
    }
  }
})