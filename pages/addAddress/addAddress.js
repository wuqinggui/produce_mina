// pages/addAddress/addAddress.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    customItem: '',
    list: [{
      tip: 'people',
      name: '收货人',
      value: '',
      placeholder: '请输入收货人'
    }, {
      tip: 'phone',
      name: '电话',
      value: '',
      placeholder: '收货人手机号'
    }, {
      tip: 'province',
      name: '地区',
      value: '',
      placeholder: '选择市/省/区'
    }, {
      tip: 'address',
      name: '详细地址',
      value: '',
      placeholder: '街道门牌,楼层房间号等信息'
    }]
  },
  enter: function() {

  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  showToast(title, duartion) {
    const that = this;
    wx.showToast({
      title: title || '',
      icon: 'none',
      duartion: duartion || 2000,
      isHidden: false
    });
  },
  submit: function() {
    if (!this.data.list[0].value) { this.showToast('收货人不能为空'); return; }
    if (this.data.list[0].value.length < 2) { this.showToast('收货人姓名限制为2~15个字符'); return; }
    if (!this.data.list[1].value) { this.showToast('手机号不能为空'); return; }
    if (!/^1[3|4|5|7|8]\d{9}$/.test(this.data.list[0].value)) { this.showToast('手机格式有误，请重新输入'); return; }
    if (this.data.region.length == 0) { this.showToast('省市地址不能为空'); return; }
    if (!this.data.list[3].value) { this.showToast('街道地址不能为空'); return; }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  onShareAppMessage: function() {

  },
  
  // 获取数据
  getData: function () {

  }
})