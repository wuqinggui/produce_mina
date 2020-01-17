// pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuthUserinfo: false, // wxml无法直接使用getApp().globalData.isAuthUserinfo
    userInfo: {},
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
    this.setData({
      isAuthUserinfo: getApp().globalData.isAuthUserinfo,
      userinfo: getApp().globalData.userinfo
    })
  },
  // 跳转收货地址
  goAddress: function () {
    wx.navigateTo({
      url: '/pages/shippingAddress/shippingAddress',
    })
  },
  // 退出登陆
  logout: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  
  navigateTo(e) {
    return
    const url = e.currentTarget.dataset.url;
    const that = this;
    if (url === undefined) {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
          console.log(tempFilePaths[0]);
          wx.uploadFile({
            url: resource.getUrl('/wx/upload'), // 仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              user: 'test'
            },
            success(res) {
              if (res.statusCode != 200) {
                resource.showTips(that, '图片上传失败');
                console.log(res);
                return;
              }
              var icon = res.data;
              resource.updateUserInfo({
                icon: icon
              }).then(res => {
                if (res.statusCode == 200) {
                  getApp().globalData.userInfo.avatarUrl = res.data.data.icon;
                  resource.showTips(that, '修改成功');
                  that.onLoad();
                } else {
                  resource.showTips(that, '修改失败');
                }
              });
            },
            fail(res) {
              console.log(res);
              resource.showTips(that, '图片上传失败');
            }
          });
        }
      });
    } else {
      wx.navigateTo({
        url
      });
    }
  }
})