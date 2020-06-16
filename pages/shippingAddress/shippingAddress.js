// pages/shippingAddress/shippingAddress.js
var shopApi = require('../../http/shopApi.js').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    list: [],
    isSelect: 0, // 是否来选择收货地址 (0为否1为是)
    addressId: '', // 选择收货地址时，从其他页传来的地址id
  },
  editAddress: function(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../addAddress/addAddress?id=' + id,
    })
  },
  add: function() {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //通过id获取组件component
    // this.loginDialog = this.selectComponent("#loginDialog")
    console.log('收货地址options', options)
    this.setData({
      isSelect: options.isSelect ? options.isSelect : 0,
      addressId: options.addressId ? options.addressId : ''
    })
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
      // this.loginDialog.closeLoginTip(); // 调用组件方法
      this.setData({
        userId: sj_userId
      });
      this.getData();
    } else {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      // this.loginDialog.showLoginTip(); // 调用组件方法
    }
  },

  // 组件回调方法
  // loginCallBack: function (e) {
  //   console.log('登陆弹框回调', e)
  //   this.onShow();
  // },

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

  // 获取数据
  getData: function() {
    this.getAddressList();
  },

  // 获取列表
  getAddressList: function() {
    let params = { userId: this.data.userId };
    shopApi.addressList(params).then((res) => {
      res.data && res.data.forEach(function(item) {
        item.addresses = item.regional.replace(/\,/g, '') + item.addresses;
      })
      this.setData({
        list: res.data
      });
    }).catch((error) => {
      console.log(error);
    })
  },

  // 选择收货地址，放到全局选择收货地址变量，返回上一页
  selectAddress: function(e) {
    console.log(e.currentTarget.dataset)
    let {
      item
    } = e.currentTarget.dataset;
    getApp().globalData.addresseeData = item;
    wx.navigateBack();
  }

})