// const AV = require('../../utils/av-weapp.js')
var shopApi = require('../../http/shopApi.js').default;
Page({
  data: {
    shopId: '',
    carList: {},
    selectedAllStatus: false, // 全选状态
    totalPrice: 0, // 合计价格
    startX: 0,
    itemLefts: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('购物车详情options', options)
    this.setData({
      shopId: options.shopId
    })
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
  
  // 获取购物车详情数据
  getData: function () {
    var userId = getApp().globalData.userInfo.id;
    var params = {
      userId: userId,
      shopid: this.data.shopId
    }
    shopApi.getCar(params)
      .then((res) => {
        console.log('获取购物车数据成功', res);
        var data = res.data ? res.data : [];
        for (var i = 0; i < data.length; i++) {
          data[i].isSelect = false;
          for (var j = 0; j < data[i].commodity.length; j++) {
            data[i].commodity[j].isSelect = false;
          }
        }
        this.setData({
          carList: data
        })
      })
      .catch((error) => {
        console.log('获取购物车数据失败', error);
        wx.showToast({
          title: error.message ? error.message : '获取购物车数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },
  // 添加商品
  addShop: function(e) {
    console.log(e.currentTarget.dataset)
    let id = e.currentTarget.dataset.item.shopid
    // wx.switchTab({
    //   url: '/pages/index/index?shopId=' + id
    // })
  },
  // 切换店铺的选中状态
  cnangeShopSelect: function (e) {
    wx.showLoading({
      title: '操作中'
    });
    console.log(e.currentTarget.dataset)
    var idx = e.currentTarget.dataset.idx;
    var data = this.data.carList;
    var isSelect = !data[idx].isSelect;
    data[idx].isSelect = isSelect;
    for (var j = 0; j < data[idx].commodity.length; j++) {
      data[idx].commodity[j].isSelect = isSelect;
    }
    this.setData({
      carList: data,
      selectedAllStatus: false
    });
    this.totalPriceNum();
  },
  // 数量-1
  bindMinus: function(e) {
    
  },
  // 数量+1
  bindPlus: function(e) {
   
  },
  // 切换单个商品选中状态
  bindCheckbox: function(e) {
    wx.showLoading({
      title: '操作中'
    });
    console.log(e.currentTarget.dataset)
    var idx = e.currentTarget.dataset.idx;
    var index = e.currentTarget.dataset.index;
    var data = this.data.carList;
    data[idx].isSelect = false;
    data[idx].commodity[index].isSelect = !data[idx].commodity[index].isSelect;
    this.setData({
      carList: data,
      selectedAllStatus: false
    });
    this.totalPriceNum();
  },
  // 切换全选
  bindSelectAll: function() {
    wx.showLoading({
      title: '操作中'
    });
    var selectedAllStatus = !this.data.selectedAllStatus; // 取反
    var data = this.data.carList;
    for (var i = 0; i < data.length; i++) {
      data[i].isSelect = selectedAllStatus;
      for (var j = 0; j < data[i].commodity.length; j++) {
        data[i].commodity[j].isSelect = selectedAllStatus;
      }
    }
    this.setData({
      selectedAllStatus: selectedAllStatus,
      carList: data,
    });
    this.totalPriceNum();
  },
  // 合计价格
  totalPriceNum: function () {
    var num = 0;
    var data = this.data.carList;
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].commodity.length; j++) {
        if (data[i].commodity[j].isSelect) {
          // 选中的加上价格, 数量转整数，价格转浮点数类型
          num = num + parseInt(data[i].commodity[j].shoppingcartintermediate.number) * parseFloat(data[i].commodity[j].price);
        }
      }
    }
    num = num.toFixed(2);
    this.setData({
      totalPrice: num
    })
    wx.hideLoading();
  },
  // 立即下单
  bindCheckout: function() {
    // var cartIds = this.calcIds();
    // if (cartIds.length) {
    //   cartIds = cartIds.join(',');
    //   wx.navigateTo({
    //     url: '../orderSubmit/orderSubmit?cartIds=' + cartIds + '&amount=' + this.data.totalPrice
    //   });
    // }
  },
  // 删除商品
  delete: function(e) {
    console.log(e.currentTarget.dataset)
    var _this = this;
    var item = e.currentTarget.dataset.item;
    wx.showModal({
      title: '温馨提示',
      content: '确认要删除该商品吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('确认删除成功');
          _this.delectSure(item);
        }
      }
    })
  },
  // 确认删除
  delectSure: function (item) {
    console.log(item)
    // wx.showLoading({
    //   title: '操作中'
    // });
  },
  // 左右滑动
  touchStart: function(e) {
    var startX = e.touches[0].clientX;
    var idx = e.currentTarget.dataset.idx;
    var itemLefts = this.data.itemLefts;
    itemLefts[idx] = [];
    for (var item in itemLefts) {
      itemLefts[item] = [];
    }
    this.setData({
      startX: startX,
      itemLefts: itemLefts
    });
  },
  touchMove: function(e) {
    var idx = e.currentTarget.dataset.idx;
    var index = e.currentTarget.dataset.index;
    var movedX = e.touches[0].clientX;
    var distance = this.data.startX - movedX;
    var itemLefts = this.data.itemLefts;
    itemLefts[idx][index] = -distance;
    this.setData({
      itemLefts: itemLefts
    });
  },
  touchEnd: function(e) {
    var idx = e.currentTarget.dataset.idx;
    var index = e.currentTarget.dataset.index;
    var endX = e.changedTouches[0].clientX;
    var distance = this.data.startX - endX;
    // button width is 80
    var buttonWidth = 80;
    if (distance <= 0) {
      distance = 0;
    } else {
      if (distance >= buttonWidth) {
        distance = 80;
      } else if (distance >= buttonWidth / 2) {
        distance = 80;
      } else {
        distance = 0;
      }
    }
    var itemLefts = this.data.itemLefts;
    itemLefts[idx][index] = -distance;
    this.setData({
      itemLefts: itemLefts
    });
  }
})