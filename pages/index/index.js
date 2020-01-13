// pages/index/index.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前城市
    curCity: {
      cityId: 111,
      cityName: '广州',
      latitude: 23.18139,
      longitude: 113.48067
    },
    // 当前店铺
    curShop: {
      shopId: 111,
      shopName: '广州店铺1'
    },
    // 店铺列表
    shopList: [
      {
        shopId: 111,
        shopName: '广州店铺1'
      }, 
      {
        shopId: 222,
        shopName: '广州店铺2'
      },
      {
        shopId: 333,
        shopName: '广州店铺3'
      },
      {
        shopId: 444,
        shopName: '广州店铺4'
      },
      {
        shopId: 555,
        shopName: '广州店铺5'
      }
    ],
    // 选中的左侧类别
    curCategoryId: 1,
    // 产品数据
    goodsList: [
      {
        categoryId: 1,
        categoryName: '水果类',
        selectedNum: 0,
        icon: '',
        children: [
          {
            goodId: 10001,
            goodName: '水果a',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          },
          {
            goodId: 10002,
            goodName: '水果b',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          },
          {
            goodId: 10003,
            goodName: '水果c',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          },
          {
            goodId: 10004,
            goodName: '水果d',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          },
          {
            goodId: 10005,
            goodName: '水果e',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          }
        ]
      },
      {
        categoryId: 2,
        categoryName: '时蔬类',
        selectedNum: 0,
        icon: '',
        children: [
          {
            goodId: 20001,
            goodName: '时蔬a',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          },
          {
            goodId: 20002,
            goodName: '时蔬b',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          },
          {
            goodId: 20003,
            goodName: '时蔬c',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          },
          {
            goodId: 20004,
            goodName: '时蔬d',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          },
          {
            goodId: 20005,
            goodName: '时蔬e',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          }
        ]
      },
      {
        categoryId: 3,
        categoryName: '肉类',
        selectedNum: 0,
        icon: '',
        children: [
          {
            goodId: 30001,
            goodName: '肉类a',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          },
          {
            goodId: 30002,
            goodName: '肉类b',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          },
          {
            goodId: 30003,
            goodName: '肉类c',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          },
          {
            goodId: 30004,
            goodName: '肉类d',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          },
          {
            goodId: 30005,
            goodName: '肉类e',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          }
        ]
      },
      {
        categoryId: 4,
        categoryName: '海鲜类',
        selectedNum: 0,
        icon: '',
        children: [
          {
            goodId: 40001,
            goodName: '海鲜a',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          },
          {
            goodId: 40002,
            goodName: '海鲜b',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          },
          {
            goodId: 40003,
            goodName: '海鲜c',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          },
          {
            goodId: 40004,
            goodName: '海鲜d',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          },
          {
            goodId: 40005,
            goodName: '海鲜e',
            isSelect: false,
            selectedNum: 0,
            label: '上品',
            price: 12,
            unit: '斤',
            imgUrl: '../../images/cai.jpg'
          }
        ]
      }
    ],
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
    let { getOpenidEnd } = getApp().globalData;
    // 已微信登陆
    if (getOpenidEnd) {
      this.pageInit();
    } else {
      // 未微信登陆
      getApp().globalData.getOpenidCb = () => {
        this.pageInit();
      }
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
    this.getData();
  },
  // 获取当前定位的城市
  getCurCity: function () {
    console.log('获取当前定位')
      getApp().setLocation(1)
        .then((res) => {
          console.log('res', res)
          wx.showToast({
            title: '获取经纬度成功',
            icon: 'none',
            duration: 2000
          })
        })
        .catch((error) => {
          console.log('error', error)
        })
  },
  // 显示店铺弹框
  showShopPop: function () {

  },
  // 关闭店铺弹框
  hidShopPop: function () {

  },
  // 获取数据
  getData: function () {
    this.getScrollHeight();
  },
  // 菜品滚动高度
  getScrollHeight: function () {
    var data = this.data.goodsList;
    var categoryHeight = 0;
    for (var i = 0; i < data.length; i++) {
      data[i].categoryHeightTop = categoryHeight;
      categoryHeight = categoryHeight + 30; // px
      if (data[i].hasOwnProperty('children')) {
        categoryHeight = categoryHeight + data[i].children.length * 100;
      }
      data[i].categoryHeightBottom = categoryHeight;
    }
    this.setData({
      goodsList: data
    })
  },
  // 点击左侧菜单
  handleChangeCategory: function (e) {
    console.log(e)
    /**
     * 监听滚动事件时会直接修改分类
     */
    let { categoryId, source } = e.currentTarget.dataset;

    // 列表点击相同分类不处理
    if (this.data.curCategoryId === categoryId) return;

    // 列表点击时记录下来，否则滚动监听会触发多次
    this.setData({
      isClickView: true,
      curCategoryId: categoryId
    });
  },
  // 监听右侧菜品滚动事件
  scroll: function (e) {
    if (this.data.isClickView) {
      this.setData({
        isClickView: false
      })
      return;
    }
    console.log(e)
    let { scrollTop } = e.detail;
    let { curCategoryId, goodsList } = this.data;

    for (var i = 0; i < goodsList.length; i++) {
      let { categoryHeightTop, categoryHeightBottom  } = goodsList[i];
      if (scrollTop >= categoryHeightTop && scrollTop < categoryHeightBottom) {
        if (curCategoryId != goodsList[i].categoryId) {
          this.setData({
            curCategoryId: goodsList[i].categoryId
          })
        }
        break;
      } else if (scrollTop >= categoryHeightBottom && (i === (goodsList.length - 1))) {
        // 最后一个
        if (curCategoryId != goodsList[i].categoryId) {
          this.setData({
            curCategoryId: goodsList[i].categoryId
          })
        }
        break;
      }
    }
  },
  // 切换菜品选中状态
  bindCheckGoodsItem: function (e) {
    console.log(e)
    let { categoryId, categoryIndex, categoryItem, goodsId, goodsIndex, goodsItem, checkValue } = e.currentTarget.dataset;
    let data = this.data.goodsList;
    data[categoryIndex].children[goodsIndex].isSelect = checkValue;
    if (checkValue) {
      // 选中
      data[categoryIndex].selectedNum = data[categoryIndex].selectedNum + 1;
    } else {
      // 取消选中
      if (data[categoryIndex].selectedNum > 0) {
        data[categoryIndex].selectedNum = data[categoryIndex].selectedNum - 1;
      }
    }
    let buyCarGoodtypeNum = 0;
    for (var i = 0; i < data.length; i++) {
      buyCarGoodtypeNum = buyCarGoodtypeNum + data[i].selectedNum;
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