// pages/shopManage/shopManage.js
var util = require('../../utils/util.js');
var shopApi = require('../../http/shopApi.js').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showNone: false,
    btnStatus: 1, // 点击按钮新增(1)还是修改(2)
    info: {},
    shopIndex: 0, //默认索引
    inputValue: '',
    showOneButtonDialog: false, //显示隐藏dialog
    oneButton: [{
      text: '添加'
    }],
    oneButton2: [{
      text: '确定'
    }],
    list: []
  },
  // 编辑店铺
  editItem: function(e) {
    let index = e.currentTarget.dataset.index;
    let info = this.data.list[index];
    this.setData({
      btnStatus: 2,
      shopIndex: index,
      info: info,
      showOneButtonDialog: true
    });

  },
  // 添加 / 修改
  tapDialogButton(e) {
    let data = this.data;
    let toastTxt = '';
    if (!data.info.merchantName) {
      toastTxt = '店铺名';
    } else if (!data.info.personName) {
      toastTxt = '负责人';
    } else if (!data.info.phone) {
      toastTxt = '联系电话';
    } else if (!data.info.desction) {
      toastTxt = '备注';
    }
    if (toastTxt) {
      return wx.showToast({
        title: "请输入" + toastTxt,
        icon: 'none',
        duration: 2000
      })
    }
    if (data.btnStatus == 2) {
      let info = data.info;
      let index = data.shopIndex;
      let id = data.list[index].id;
      let param = info;
      shopApi.updateShop(param).then((res) => {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
        this.getData();
      }).catch((error) => {
        console.log(error);
        wx.showToast({
          title: error.message ? error.message : '获取数据失败',
          icon: 'none',
          duration: 2000
        })
      })
    } else {
      let param = data.info;
      shopApi.addShop(param).then((res) => {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })
        this.getData();
      }).catch((error) => {
        console.log(error);
        wx.showToast({
          title: error.message ? error.message : '获取数据失败',
          icon: 'none',
          duration: 2000
        })
      })
    }
    this.setData({
      showOneButtonDialog: false
    })
  },
  bindKeyInput: function(e) {
    let inputValue = e.detail.value;
    let params = {
      merchantName: inputValue
    };
    shopApi.findListShop(params).then((res) => {
      this.setData({
        list: res.data
      })
    }).catch((error) => {
      wx.showToast({
        title: error.message ? error.message : '获取数据失败',
        icon: 'none',
        duration: 2000
      })
    })
  },
  bindAndSet: function(e) {
    let key = e.currentTarget.dataset.key;
    let info = this.data.info;
    info[key] = e.detail.value;
    this.setData({
      info: info
    })
  },
  addShop: function() {
    let info = {
      merchantName: '',
      personName: '',
      phone: '',
      desction: ''
    };
    this.setData({
      btnStatus: 1,
      info: info,
      showOneButtonDialog: true
    })
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
      wx.showLoading({
        title: '加载中',
      })
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
  getData: function() {
    shopApi.shopList().then((res) => {
      wx.hideLoading();
      this.setData({
        showNone: true,
        list: res.data
      });
    }).catch((err) => {
      wx.hideLoading();
      wx.showToast({
        title: error.message ? error.message : '获取数据失败',
        icon: 'none',
        duration: 2000
      })
    })
  }
})