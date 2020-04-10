var shopApi = require('../../http/shopApi.js').default;
// pages/checkUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    checkId: '', //上个页面传过来的id
    currentIndex: -1,
    showNone: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      checkId: options.id ? options.id : ''
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindKeyInput: function (e) {
    let inputValue = e.detail.value;
    let params = {
      phone: inputValue
    };
    shopApi.findListSqNmUsers(params).then((res) => {
      wx.hideLoading();
      this.setData({
        showNone: true,
        list: res.data ? res.data : []
      });
    }).catch((err) => {
      wx.hideLoading();
      console.log(err);
    })
  },
  enterUser: function() {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2]; 
    let index = this.data.currentIndex;
    prevPage.setData({
      checkUser_id: this.data.list[index].id,
      checkUser_name: this.data.list[index].nickname
    })
    console.log(prevPage);
    wx.navigateBack();
  },
  selectItem: function(e) {
    let index = e.currentTarget.dataset.index;
    let id = this.data.list[index].id;
    this.setData({
      currentIndex: index,
      checkId: id
    });
  },
  // 获取数据
  getData: function () {
    wx.showLoading({
      title: '加载中...',
    })
    shopApi.findListSqNmUsers().then((res) => {
      wx.hideLoading();
      this.setData({
        showNone: true,
        list: res.data ? res.data : []
      });
    }).catch((err) => {
      wx.hideLoading();
      console.log(err);
    })
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

  }
})