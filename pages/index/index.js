// pages/index/index.js
var shopApi = require('../../http/shopApi.js').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLock: false, // 已登陆的用户的地区id
    customerTypeId: '', // 客户类型id
    name: '', // 模糊搜索
    // 当前地区
    curRegion: {},
    // 当前地区在地区列表的index
    curRegionIndex: 0,
    // 地区列表
    regionList: [],
    // 当前店铺
    curShop: {},
    // 店铺列表
    shopList: [],
    shopPop: false, // 是否显示店铺弹框
    showShopList: false, // 是否显示店铺下拉列表
    // 大分类
    classList: [],
    curClass: {}, // 当前大分类
    // 小分类
    smallClassList: [],
    // 当前小分类
    curSmallClass: {},
    // 产品数据
    goodsList: [],
    buyCarGoodtypeNum: 0,
    imgPlaceholder: '../../images/cai.jpg', // 默认图片
    isClickView: false,
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
    this.pageInit();
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

  // 页面初始化
  pageInit: function () {
    console.log('首页')
    this.getRegionList(); // 获取地区列表
  },
  
  // 获取地区列表
  getRegionList: function () {
    wx.showLoading({
      title: '加载中',
    })
    shopApi.region()
      .then((res) => {
        console.log('获取地区数据成功', res);
        wx.hideLoading();
        this.setData({
          regionList: res.data,
          curRegion: res.data.length > 0 ? res.data[0] : {},
          curRegionIndex: 0
        })
        var regionId = getApp().globalData.userInfo.regionId ? getApp().globalData.userInfo.regionId : '';
        // 已登陆
        if (regionId) {
          this.setData({
            isLock: true
          })
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].id === regionId) {
              this.setData({
                curRegion: res.data[i],
                curRegionIndex: i
              })
              break
            }
          }
          this.getCustomerType(); // 查询客户类型
        } else {
          this.setData({
            isLock: false
          })
          this.getShopClass(); // 获取大分类
        }
      })
      .catch((error) => {
        console.log('获取地区数据失败', error);
        wx.hideLoading();
        wx.showToast({
          title: error.message ? error.message : '获取地区数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 查询客户类型
  getCustomerType: function () {
    wx.showLoading({
      title: '加载中',
    })
    var params = {
      userId: getApp().globalData.userInfo.id ? getApp().globalData.userInfo.id : ''
    }
    shopApi.findShopByUserId(params)
      .then((res) => {
        console.log('查询客户类型成功', res);
        wx.hideLoading();
        this.setData({
          customerTypeId: res.data.customerType ? res.data.customerType : ''
        })
        this.getShopClass(); // 获取大分类
      })
      .catch((error) => {
        console.log('查询客户类型失败', error);
        wx.hideLoading();
        wx.showToast({
          title: error.message ? error.message : '查询客户类型失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 获取大分类
  getShopClass: function () {
    wx.showLoading({
      title: '加载中',
    })
    shopApi.shopClass()
      .then((res) => {
        console.log('获取大分类数据成功', res);
        wx.hideLoading();
        this.setData({
          classList: res.data ? res.data : [],
          curClass: res.data.length > 0 ? res.data[0] : {}
        })
        this.getShopSmallClass(); // 查询小分类
      })
      .catch((error) => {
        console.log('获取大分类数据失败', error);
        wx.hideLoading();
        wx.showToast({
          title: error.message ? error.message : '获取大分类数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 查询小分类
  getShopSmallClass: function () {
    wx.showLoading({
      title: '加载中',
    })
    var params = {
      classId: this.data.curClass.id ? this.data.curClass.id : ''
    }
    shopApi.shopSmallClass(params)
      .then((res) => {
        console.log('获取小分类数据成功', res);
        wx.hideLoading();
        this.setData({
          smallClassList: res.data,
          curSmallClass: res.data.length > 0 ? res.data[0] : {}
        })
        this.getCommodity();
      })
      .catch((error) => {
        console.log('获取小分类数据失败', error);
        wx.hideLoading();
        wx.showToast({
          title: error.message ? error.message : '获取小分类数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 获取小分类对应的商品
  getCommodity: function () {
    wx.showLoading({
      title: '加载中',
    })
    var params = {
      regionID: this.data.curRegion.id ? this.data.curRegion.id : '',
      shopsmallclassid: this.data.curSmallClass.id? this.data.curSmallClass.id : '',
      name: this.data.name,
      customerTypeId: this.data.customerTypeId
    }
    shopApi.commodityList(params)
      .then((res) => {
        console.log('获取商品数据成功', res);
        wx.hideLoading();
        var data = res.data ? res.data : [];
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data[i].specpricelst.length; j++) {
            data[i].specpricelst[j].isSelect = false;
          }
        }
        this.setData({
          goodsList: data,
          buyCarGoodtypeNum: 0
        })
      })
      .catch((error) => {
        console.log('获取商品数据失败', error);
        wx.hideLoading();
        wx.showToast({
          title: error.message ? error.message : '获取商品数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 模糊查询输入商品名称
  bingChangeName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  // 模糊查询
  searchName: function () {
    console.log('模糊查询')
    if (this.data.curRegion.id && this.data.curSmallClass.id) {
      this.getCommodity();
    }
  },

  // 切换地区
  bindPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value;
    if (this.data.curRegion.id && this.data.regionList[index].id && this.data.curRegion.id == this.data.regionList[index].id) {
      return
    } else {
      this.setData({
        curRegionIndex: index,
        curRegion: this.data.regionList[index]
      })
      this.getCommodity();
    }
  },

  // 切换大分类
  handleChangeClass: function (e) {
    console.log(e.currentTarget.dataset)
    let { item } = e.currentTarget.dataset;
    if (item.id === this.data.curClass.id) {
      return
    }
    this.setData({
      curClass: item
    });
    this.getShopSmallClass();
  },

  // 点击左侧小分类菜单
  handleChangeSmallClass: function (e) {
    console.log(e.currentTarget.dataset)
    let { item } = e.currentTarget.dataset;
    if (item.id === this.data.curSmallClass.id) {
      return
    }
    this.setData({
      curSmallClass: item
    });
    this.getCommodity();
  },

  // 切换菜品选中状态
  bindCheckSpecItem: function (e) {
    console.log(e.currentTarget.dataset)
    let { index, specindex, checkValue } = e.currentTarget.dataset;
    let data = this.data.goodsList;
    data[index].specpricelst[specindex].isSelect = checkValue;
    let buyCarGoodtypeNum = 0;
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].specpricelst.length; j++) {
        if (data[i].specpricelst[j].isSelect) {
          buyCarGoodtypeNum = buyCarGoodtypeNum + 1;
        }
      }
    }
    this.setData({
      goodsList: data,
      buyCarGoodtypeNum: buyCarGoodtypeNum
    })
  },

  // 加入购物车
  addCar: function () {
    if (this.data.buyCarGoodtypeNum == 0) {
      wx.showToast({
        title: '请先选择商品',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let sj_userId = wx.getStorageSync('sj_userId')
    if (!sj_userId) {
      // 未登陆
      wx.showModal({
        title: '登陆提示',
        content: '您还没有登陆，是否去登陆？',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          }
        }
      })
    } else {
      // 已登陆
      this.getShopList(); // 获取店铺
    }
  },

  // 获取店铺
  getShopList: function () {
    wx.showLoading({
      title: '加载中',
    });
    var userId = getApp().globalData.userInfo.id;
    var params = {
      page: {
        page: 1,
        size: 100
      },
      type: 0,
      userId: userId
    }
    shopApi.buyShop(params)
      .then((res) => {
        console.log('获取店铺成功', res);
        wx.hideLoading();
        this.setData({
          shopList: res.data.list ? res.data.list : [],
          curShop: res.data.list && res.data.list.length > 0 ? res.data.list[0] : {}
        })
        this.showShopPop();
      })
      .catch((error) => {
        console.log('获取店铺失败', error);
        wx.hideLoading();
        wx.showToast({
          title: error.message ? error.message : '获取店铺数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },
  // 显示店铺弹框
  showShopPop: function () {
    this.setData({
      shopPop: true,
      showShopList: false
    })
  },
  // 显示店铺下拉数据
  showShopSelect: function () {
    this.setData({
      showShopList: !this.data.showShopList
    })
  },
  // 切换店铺
  changeShop: function (e) {
    console.log(e)
    let { shopItem } = e.currentTarget.dataset;
    this.setData({
      curShop: shopItem,
      showShopList: false
    })
  },
  // 确认切换店铺
  sureChangeShop: function (e) {
    if (!this.data.curShop.id) {
      wx.showToast({
        title: '没有店铺数据不能添加购物车，请选择购买店铺',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      showShopList: false,
      shopPop: false
    })
    this.sureAddCar();
  },
  // 关闭店铺弹框
  hidShopPop: function () {
    this.setData({
      showShopList: false,
      shopPop: false
    })
  },

  // 确认添加到购物车
  sureAddCar: function () {
    wx.showLoading({
      title: '添加中',
    });
    var shopCommoditDto = [];
    var data = this.data.goodsList;
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].specpricelst.length; j++) {
        if (data[i].specpricelst[j].isSelect) {
          var item = {
            id: data[i].id,
            spec: data[i].specpricelst[j].spec.id,
            number: 1
          }
          shopCommoditDto.push(item)
        }
      }
    }
    var params = {
      shopCommoditDto: shopCommoditDto,
      regionId: this.data.curRegion.id,
      shopId: this.data.curShop.id,
      userId: getApp().globalData.userInfo.id,
    }
    shopApi.addCar(params)
    .then((res) => {
      console.log('商品添加进购物车成功', res);
      wx.hideLoading();
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 1000
      })
      var data = this.data.goodsList;
      for (var a = 0; a < data.length; a++) {
        for (var b = 0; b < data[a].specpricelst.length; b++) {
          data[a].specpricelst[b].isSelect = false;
        }
      }
      this.setData({
        goodsList: data,
        buyCarGoodtypeNum: 0
      })
    })
    .catch((error) => {
      console.log('商品添加进购物车失败', error);
      wx.hideLoading();
      wx.showToast({
        title: error.message ? error.message : '添加失败',
        icon: 'none',
        duration: 2000
      })
    })
  }
})