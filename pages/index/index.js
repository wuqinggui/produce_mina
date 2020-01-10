// pages/index/index.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [],// 分类数据
    categoryListFixed: false,
    categoryCur: '',// 当前选中分类id
    categoryCurView: '',// 当前选中分类锚点
    categoryBarFixed: '',// 分类贴顶锚点

    goodsList: [],// 产品数据

    maskVisible: false,// 遮罩是否显示
    shopLoading: true,// 门店加载状态
    menuLoading: true,// 菜单加载状态
    
    // 加号添加购物车动画
    cartLoading: false,
    curCartLoadingId: '',
    curCartLoadingIndex: 0,
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
    this.getCurCity();
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
  }
})