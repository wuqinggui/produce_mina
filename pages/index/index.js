// pages/index/index.js
var shopApi = require('../../http/shopApi.js').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionLoading: false,
    shopLoading: false,
    classLoading: false,
    smallClassLoading: false,
    carLoading: false,
    commodityLoading: false,
    // 当前地区
    curRegion: {},
    // 当前地区在地区列表的index
    curRegionIndex: 0,
    // 地区列表
    regionList: [],
    // 当前店铺
    curShop: {},
    shopPopData: {}, // 店铺弹框选择前的店铺数据
    // 店铺列表
    shopList: [],
    shopPop: false, // 是否显示店铺弹框
    showShopList: false, // 是否显示店铺下拉列表
    // 大分类
    classList: [],
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
    let sj_userId = wx.getStorageSync('sj_userId')
    if (sj_userId) {
      this.pageInit();
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

  // 页面初始化
  pageInit: function () {
    console.log('首页')
    this.getRegionList(); // 获取地区列表
    this.getShopList(); // 获取店铺
    this.getShopClass(); // 获取大分类
    this.getShopSmallClass(); // 查询小分类
    this.getCarData(); // 获取购物车数据
  },
  
  // 获取地区列表
  getRegionList: function () {
    var regionId = getApp().globalData.userInfo.regionId;
    shopApi.region()
      .then((res) => {
        console.log('获取地区数据成功', res);
        this.setData({
          regionList: res.data
        })
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].id === regionId) {
            this.setData({
              curRegion: res.data[i]
            })
            break
          }
        }
      })
      .catch((error) => {
        console.log('获取地区数据失败', error);
        wx.showToast({
          title: error.message ? error.message : '获取地区数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 获取店铺
  getShopList: function () {
    var shopId = getApp().globalData.userInfo.shopId;
    var params = {
      id: shopId
    }
    shopApi.findShopByID(params)
      .then((res) => {
        console.log('获取店铺成功', res);
        this.setData({
          shopList: res.data
        })
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].id === shopId) {
            this.setData({
              curShop: res.data[i]
            })
            break
          }
        }
      })
      .catch((error) => {
        console.log('获取店铺失败', error);
        wx.showToast({
          title: error.message ? error.message : '获取店铺数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 获取大分类
  getShopClass: function () {
    shopApi.shopClass()
      .then((res) => {
        console.log('获取大分类数据成功', res);
        var num = 0;
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].imagepath) {
            num = num + 1
          }
        }
        if (num > 0 && num === res.data.length) {
          this.setData({
            classList: res.data
          })
        } else {
          this.setData({
            classList: []
          })
        }
      })
      .catch((error) => {
        console.log('获取大分类数据失败', error);
        wx.showToast({
          title: error.message ? error.message : '获取大分类数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 查询小分类
  getShopSmallClass: function () {
    shopApi.shopSmallClass()
      .then((res) => {
        console.log('获取小分类数据成功', res);
        this.setData({
          smallClassList: res.data,
          curSmallClass: res.data.length > 0 ? res.data[0] : {}
        })
        this.getCommodity();
      })
      .catch((error) => {
        console.log('获取小分类数据失败', error);
        wx.showToast({
          title: error.message ? error.message : '获取小分类数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 获取小分类对应的商品
  getCommodity: function () {
    var params = {
      regionID: this.data.curRegion.id,
      shopsmallclassid: this.data.curSmallClass.id
    }
    shopApi.commodityList(params)
      .then((res) => {
        console.log('获取商品数据成功', res);
        this.setData({
          goodsList: res.data
        })
      })
      .catch((error) => {
        console.log('获取商品数据失败', error);
        wx.showToast({
          title: error.message ? error.message : '获取商品数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 获取购物车数据
  getCarData: function () {
    var userId = getApp().globalData.userInfo.id;
    var params = {
      userId: userId
    }
    shopApi.getCar(params)
      .then((res) => {
        console.log('获取购物车数据成功', res);
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

  // 切换地区
  bindPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value;
    this.setData({
      curRegionIndex: index,
      curRegion: this.data.regionList[index]
    })
  },

  // 显示店铺弹框
  showShopPop: function () {
    console.log('显示店铺弹框', this.data.curShop)
    this.setData({
      shopPopData: this.data.curShop,
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
    let { shopId, shopItem } = e.currentTarget.dataset;
    this.setData({
      shopPopData: shopItem,
      showShopList: false
    })
  },
  // 确认切换店铺
  sureChangeShop: function (e) {
    if (this.data.curShop.shopId && this.data.shopPopData.shopId && this.data.shopPopData.shopId == this.data.curShop.shopId) {
      this.setData({
        showShopList: false,
        shopPop: false
      })
    } else {
      this.setData({
        curShop: this.data.shopPopData,
        showShopList: false,
        shopPop: false
      })
    }
  },
  // 关闭店铺弹框
  hidShopPop: function () {
    this.setData({
      showShopList: false,
      shopPop: false
    })
  },
  // 点击左侧小分类菜单
  handleChangeSmallClass: function (e) {
    console.log(e)
    let { item } = e.currentTarget.dataset;
    if (item.id === this.data.curSmallClass.id ) {
      return
    }
    this.setData({
      curSmallClass: item
    });
    this.getCommodity();
  },

  // 切换菜品选中状态
  bindCheckGoodsItem: function (e) {
    console.log(e)
    let { index, checkValue } = e.currentTarget.dataset;
    let data = this.data.goodsList;
    data[index].isSelect = checkValue;
    let buyCarGoodtypeNum = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i].isSelect) {
        buyCarGoodtypeNum = buyCarGoodtypeNum + 1;
      }
    }
    this.setData({
      goodsList: data,
      buyCarGoodtypeNum: buyCarGoodtypeNum
    })
  },
  // 加入购物车
  addCar: function () {
    if (this.data.buyCarGoodtypeNum > 0) {
      wx.switchTab({
        url: '/pages/buyCar/buyCar'
      })
    } else {
      wx.showToast({
        title: '请先选择菜品',
        icon: 'none',
        duration: 2000
      })
    }
  },
})