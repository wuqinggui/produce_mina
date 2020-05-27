// pages/register/register.js
var shopApi = require('../../http/shopApi.js').default;
var MD5 = require('../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionList: [], // 地区列表
    customerTypeArr: [], //客户类型
    staffInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 选择客户类型
  checkCustomerType: function (e) {
    let { customerTypeArr, staffInfo } = this.data;
    let index = e.detail.value;
    ({ id: staffInfo.customertyId, name: staffInfo.customertyName } = customerTypeArr[index]);
    this.setData({
      staffInfo: staffInfo
    });
  },
  // 选择地区
  checkRegion(e) {
    let { regionList, staffInfo } = this.data;
    let index = e.detail.value;
    ({id: staffInfo.regionId, name: staffInfo.regionName } = regionList[index]);
    this.setData({
      staffInfo: staffInfo
    });
  },
  back: function() {
    wx.navigateBack({});
  },
  registerHandle: function() {
    let staffInfo = this.data.staffInfo;
    // 邮箱正则匹配
    let emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    let toastTxt = '';
    if (!staffInfo.userName) {
      toastTxt = '请输入手机号';
    } else if (!/^1[3|4|5|7|8]\d{9}$/.test(staffInfo.userName)) {
      toastTxt = '手机号码格式，请重新输入';
    } else if (!staffInfo.nickname) {
      toastTxt = '请输入昵称';
    } else if (!staffInfo.password) {
      toastTxt = '请输入密码';
    } else if (!staffInfo.enterPassword) {
      toastTxt = '请输入确认密码';
    } else if (staffInfo.password != staffInfo.enterPassword) {
      toastTxt = '密码不一致，请重新输入';
    } else if (!staffInfo.email) {
      toastTxt = '请输入邮箱';
    } else if (!emailReg.test(staffInfo.email)) {
      toastTxt = '邮箱格式有误，请重新输入';
    } else if (!staffInfo.regionId) {
      toastTxt = '请选择地区';
    } else if (!staffInfo.customertyId) {
      toastTxt = '请选择客户类型';
    }
    if (toastTxt) {
      return wx.showToast({
        title: toastTxt,
        icon: 'none',
        duration: 2000
      })
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    staffInfo.userType = 3; //定为商家管理员
    staffInfo.stats = 1; //状态
    staffInfo.phone = staffInfo.userName; //号码同用户名一致。
    staffInfo.password = MD5.hexMD5(staffInfo.password)
    shopApi.addUser(staffInfo).then((res) => {
      wx.hideLoading(); 
      wx.showToast({
        title: res.message ? res.message : '注册成功',
        icon: 'success',
        success: function() {
          wx.navigateBack();
        }
      })
    }).catch((error) => {
      wx.hideLoading(); 
      wx.showToast({
        title: error.message ? error.message : '注册失败',
        icon: 'none',
        duration: 2000
      })
    })

  },
  bindAndSet: function (e) {
    let key = e.currentTarget.dataset.key;
    let staffInfo = this.data.staffInfo;
    staffInfo[key] = e.detail.value;
    this.setData({
      staffInfo: staffInfo
    })
  },
  // 获取地区列表
  getRegionList () {
    shopApi.region()
      .then((res) => {
        this.setData({
          regionList: res.data ? res.data : [],
        })
      }).catch((error) => {
        console.log(error);
      }) 
  },
  // 获取客户类型
  getCustomerType: function () {
    shopApi.customertypeList().then((res) => {
      this.setData({
        customerTypeArr: res.data ? res.data : []
      });
    }).catch((error) => {
      console.log(error);
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
    this.getCustomerType(); //获取客户类型
    this.getRegionList(); // 获取地区列表
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
  // onShareAppMessage: function () {

  // }
})