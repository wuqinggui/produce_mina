// const AV = require('../../utils/av-weapp.js')
var shopApi = require('../../http/shopApi.js').default;
Page({
  data: {
    classList: [], // 大分类
    curClass: {}, // 当前大分类
    shopId: '',
    carList: [],
    selectedAllStatus: false, // 全选状态
    totalPrice: 0, // 合计价格
    startX: 0,
    itemLefts: {},
    isClick: false,
    isFoucs: '', // 是否获取焦点
    curIdx: -1,
    curIndex: -1,
    curItem: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //通过id获取组件component
    // this.loginDialog = this.selectComponent("#loginDialog")
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
      // this.loginDialog.closeLoginTip(); // 调用组件方法
      this.getShopClass();
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
        this.getData(); // 查询购物车大分类的商品信息
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
  
  // 获取购物车详情数据
  getData: function () {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // });
    var params = {
      userId: getApp().globalData.userInfo.id,
      shopClassId: this.data.curClass.id, // 新增大分类id字段
      shopId: this.data.shopId
    }
    shopApi.getCar(params)
      .then((res) => {
        console.log('获取购物车数据成功', res);
        // wx.hideLoading();
        var data = [];
        data[0] = res.data ? res.data : [];
        for (var i = 0; i < data.length; i++) {
          data[i].isSelect = false;
          for (var j = 0; j < data[i].lst.length; j++) {
            data[i].lst[j].isSelect = false;
            data[i].lst[j].commodity.price = data[i].lst[j].commodity.price.toFixed(2);
          }
        }
        this.setData({
          carList: data,
          selectedAllStatus: false,
          totalPrice: 0,
          startX: 0,
          itemLefts: {},
          isClick: false
        })
        this.bindSelectAll();
      })
      .catch((error) => {
        console.log('获取购物车数据失败', error);
        // wx.hideLoading();
        wx.showToast({
          title: error.message ? error.message : '获取购物车数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },
  // 添加商品
  addShop: function() {
    getApp().globalData.curBigClassData = this.data.curClass;
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  // 去下单
  goBuy: function () {
    getApp().globalData.curBigClassData = this.data.curClass;
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  // 切换商户的选中状态
  cnangeShopSelect: function (e) {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // });
    console.log(e.currentTarget.dataset)
    var idx = e.currentTarget.dataset.idx;
    var data = this.data.carList;
    var isSelect = !data[idx].isSelect;
    data[idx].isSelect = isSelect;
    for (var j = 0; j < data[idx].lst.length; j++) {
      data[idx].lst[j].isSelect = isSelect;
    }
    this.setData({
      carList: data,
      selectedAllStatus: false
    });
    this.countTotal();
  },
  // 数量-1
  bindMinus: function(e) {
    console.log(e.currentTarget.dataset)
    let { item } = e.currentTarget.dataset;
    if (this.data.isClick) {
      return
    }
    if (item.number > 0) {
      this.setData({
        isClick: true
      })
      // 修改
      this.changeCar(item, 1);
    }
  },
  // 数量+1
  bindPlus: function(e) {
    console.log(e.currentTarget.dataset)
    let { item } = e.currentTarget.dataset;
    if (this.data.isClick) {
      return
    }
    this.setData({
      isClick: true
    })
    this.changeCar(item, 2);
  },

  // 点击先获取当前操作的商品信息，input获取焦点
  getFoucs: function (e) {
    console.log('-------------------点击先获取当前操作的商品信息---------------------');
    console.log(e.currentTarget.dataset.item.number)
    let { item, idx, index } = e.currentTarget.dataset;
    this.setData({
      curIdx: idx,
      curIndex: index,
      curItem: item
    })
  },

  // 失去焦点，修改数量
  changeNumber: function (e) {
    var value = e.detail.value;
    var item = e.currentTarget.dataset.item;
    if (value < 0) {
      wx.showToast({
        title: '数量不能小于0',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        curIdx: -1,
        curIndex: -1,
        curItem: {}
      })
      return
    }
    if (this.data.isClick) {
      return
    }
    this.setData({
      isClick: true
    })
    this.setData({
      curIdx: -1,
      curIndex: -1
    })
    this.changeCar(item, 3, value);
  },

  // 修改购物车商品数据
  changeCar: function (item, type, value) {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // });
    var newNum = 0;
    if (type == 1) {
      // 减少
      newNum = item.number - 1;
    } else if (type == 2){
      // 增加
      newNum = item.number + 1;
    } else if (type == 3) {
      // 输入框改数量
      newNum = value
    }
    var params = {
      shopCommoditDto: [
        {
          id: item.commodityId,
          number: newNum,
          specId: item.specId
        }
      ],
      shopId: item.shopId,
      shopClassId: this.data.curClass.id, // 新增大分类id字段
      userId: getApp().globalData.userInfo.id,
    }
    shopApi.updateCar(params)
    .then((res) => {
      console.log('修改购物车商品数据成功', res);
      // wx.hideLoading();
      this.setData({
        isClick: false
      })
      this.getData();
    })
    .catch((error) => {
      console.log('修改购物车商品数据失败', error);
      // wx.hideLoading();
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

  // 切换单个商品选中状态
  bindCheckbox: function(e) {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // });
    console.log(e.currentTarget.dataset)
    var idx = e.currentTarget.dataset.idx;
    var index = e.currentTarget.dataset.index;
    var data = this.data.carList;
    data[idx].isSelect = false;
    data[idx].lst[index].isSelect = !data[idx].lst[index].isSelect;
    this.setData({
      carList: data,
      selectedAllStatus: false
    });
    this.countTotal();
  },
  // 切换全选
  bindSelectAll: function() {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // });
    var selectedAllStatus = !this.data.selectedAllStatus; // 取反
    var data = this.data.carList;
    for (var i = 0; i < data.length; i++) {
      data[i].isSelect = selectedAllStatus;
      for (var j = 0; j < data[i].lst.length; j++) {
        data[i].lst[j].isSelect = selectedAllStatus;
      }
    }
    this.setData({
      selectedAllStatus: selectedAllStatus,
      carList: data,
    });
    this.countTotal();
  },
  // 合计价格
  countTotal: function () {
    var num = 0;
    var data = this.data.carList;
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].lst.length; j++) {
        if (data[i].lst[j].isSelect) {
          // 选中的加上价格, 数量转整数，价格转浮点数类型
          num = num + parseInt(data[i].lst[j].number) * parseFloat(data[i].lst[j].commodity.price);
        }
      }
    }
    num = num.toFixed(2);
    this.setData({
      totalPrice: num
    })
    // wx.hideLoading();
  },
  // 删除商品
  delete: function(e) {
    console.log(e.currentTarget.dataset)
    if (this.data.isClick) {
      return
    }
    this.setData({
      isClick: true
    })
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // });
    var item = e.currentTarget.dataset.item;
    var shopCommoditDto = [
      {
        id: item.commodityId,
        specId: item.specId
      }
    ];
    var params = {
      shopCommoditDto: shopCommoditDto,
      shopId: item.shopId,
      shopClassId: this.data.curClass.id, // 新增大分类id字段
      userId: getApp().globalData.userInfo.id
    }
    shopApi.deleteCar(params)
      .then((res) => {
        console.log('删除购物车数据成功', res);
        // wx.hideLoading();
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1000
        })
        this.setData({
          isClick: false
        })
        this.getData();
      })
      .catch((error) => {
        console.log('删除购物车数据失败', error);
        // wx.hideLoading();
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
  // 立即下单
  bindSubmitOder: function() {
    var data = this.data.carList;
    var submitData = this.data.carList[0];
    submitData.lstSubmit = [];
    var selectNum = 0;
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].lst.length; j++) {
        if (data[i].lst[j].isSelect) {
          submitData.lstSubmit.push(data[i].lst[j]);
          selectNum = 1;
        }
      }
    }
    if (selectNum == 0) {
      wx.showToast({
        title: '请先选择下单商品',
        icon: 'none',
        duration: 2000
      })
      return
    }
    getApp().globalData.submitCarData = submitData;
    wx.navigateTo({
      url: '/pages/orderSubmit/orderSubmit?shopClassId=' + this.data.curClass.id
    })
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