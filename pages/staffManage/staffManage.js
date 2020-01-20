// pages/staffManage/staffManage.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    shopName: '',
    worktype: '',
    showOneButtonDialog: false,
    oneButton: [{ text: '添加' }],
    array: ['美国', '中国', '巴西', '日本'],
    list: [{
      name: '小港',
      phone: '13169418600',
      shopName: '广州天河百货分店',
      remark: '下单员',
    }, {
      name: '小港',
      phone: '13169418600',
      shopName: '广州天河百货分店',
      remark: '下单员',
    }, {
      name: '小港',
      phone: '13169418600',
      shopName: '广州天河百货分店',
      remark: '下单员',
    }, {
      name: '小港',
      phone: '13169418600',
      shopName: '广州天河百货分店',
      remark: '下单员',
    }, {
      name: '小港',
      phone: '13169418600',
      shopName: '广州天河百货分店',
      remark: '下单员',
    }]
  },
  selectShop: function() {

  },
  bindPickerChange: function (e) {
    var array = this.data.array;
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      inputValue: array[e.detail.value]
    })
  },
  bindPickerChange2: function (e) {
    var array = this.data.array;
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      shopName: array[e.detail.value]
    })
  },
  bindPickerChange3: function (e) {
    var array = this.data.array;
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      worktype: array[e.detail.value]
    })
  },
  tapDialogButton(e) {
    this.setData({
      showOneButtonDialog: false
    })
  },
  addShop: function () {
    this.setData({
      showOneButtonDialog: true
    })
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

  }
})