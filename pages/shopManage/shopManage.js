// pages/shopManage/shopManage.js
var util = require('../../utils/util.js');
var shopApi = require('../../http/shopApi.js').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopId: '',
    showNone: false,
    btnStatus: 1, // 点击按钮新增(1)还是修改(2)
    info: {},
    userId: '',
    shopIndex: 0, //默认索引
    inputValue: '',
    showOneButtonDialog: false, //显示隐藏dialog
    oneButton: [{
      text: '添加'
    }],
    oneButton2: [{
      text: '确定'
    }],
    list: [], // 页面商户列表
    userList: [], //负责人列表
    superiorShop: []  // 上级商户列表
  },
  // 编辑商户
  editItem: function(e) {
    let index = e.currentTarget.dataset.index;
    let info = this.data.list[index];
    info.nickname = info.nmUser.nickname;
    this.getCurrShopUser(info.id);
    // if (shopId) { //获取上级商户
    //   this.getSuperiorShop(shopId);
    // }
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
      toastTxt = '请输入商户名';
    } else if (!data.info.personId) {
      toastTxt = '请选择负责人';
    } else if (!data.info.phone) {
      toastTxt = '请输入联系电话';
    } else if (!/^1[3|4|5|7|8]\d{9}$/.test(data.info.phone)) {
      toastTxt = '联系电话格式有误，请重新输入';
    } else if (!data.info.desction) {
      toastTxt = '请输入备注';
    }
    if (toastTxt) {
      return wx.showToast({
        title: toastTxt,
        icon: 'none',
        duration: 2000
      })
    }
    data.info.userId = this.data.userId;
    data.info.type = 0; // 商户类型 0-商户 1-供应商
    data.info.shopSuperior = wx.getStorageSync('shopId');
    data.info.regionId = wx.getStorageSync('sj_userInfo').regionId; // 默认当前用户地区
    // 修改
    if (data.btnStatus == 2) {
      shopApi.updateShop(data.info).then((res) => {
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
    } else { // 新增
      data.info.auditStatus = 1; // 审核状态（1-未审核 2-已审核 3-已拒绝 4-撤销）
      shopApi.addShop(data.info).then((res) => {
        wx.showToast({
          title: '添加成功',
          icon: 'none',
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
      userId: this.data.userId,
      merchantName: inputValue
    };
    shopApi.findListShop(params).then((res) => {
        this.setData({
          list: res.data ? res.data : []
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
    let shopId = this.data.shopId;
    let info = {
      merchantName: '',
      personId: '',
      phone: '',
      desction: ''
    };
    this.getCurrShopUser(shopId);
    this.setData({
      btnStatus: 1,
      info: info,
      showOneButtonDialog: true
    })
  },
  // 撤销申请
  repealApply: function(e) {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确认撤销申请订单？',
      success(res) {
        if (res.confirm) {
          let index = e.currentTarget.dataset.index;
          let info = _this.data.list[index];
          info.auditStatus = 4;
          shopApi.updateShop(info).then((res) => {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
            _this.getData();
          }).catch((error) => {
            console.log(error);
            wx.showToast({
              title: error.message ? error.message : '获取数据失败',
              icon: 'none',
              duration: 2000
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
    let shopId = wx.getStorageSync('shopId');
    if (sj_userId) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      this.setData({
        userId: sj_userId,
        shopId: shopId
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
    this.getShopList();
  },
  // 获取上级商户列表
  getSuperiorShop: function (shopId) {
    let params = {
      shopId: shopId
    };
    shopApi.findMoreShopById(params).then((res) => {
      this.setData({
        superiorShop: res.data ? res.data : []
      })
    }).catch((error) => {
      console.log(error);
      wx.showToast({
        title: error.message ? error.message : '获取数据失败',
        icon: 'none',
        duration: 2000
      })
    })
  },
  // 获取商户列表
  getShopList: function() {
    let params = {
      userId: this.data.userId
    };
    shopApi.getUserShop(params).then((res) => {
      wx.hideLoading();
      this.setData({
        showNone: true,
        list: res.data ? res.data : []
      });
    }).catch((err) => {
      wx.hideLoading();
      wx.showToast({
        title: error.message ? error.message : '获取数据失败',
        icon: 'none',
        duration: 2000
      })
    })
  },
  // 负责人选中
  changePerson: function(e) {
    let index = e.detail.value;
    let info = this.data.info;
    let userList = this.data.userList;
    info.personId = userList[index].id;
    info.nickname = userList[index].nickname;
    this.setData({
      info: info
    });
  },
  // 选择上级商户
  changeShop: function(e) {
    let index = e.detail.value;
    let info = this.data.info;
    let superiorShop = this.data.superiorShop;
    info.shopSuperior = superiorShop[index].merchantName;
    this.setData({
      info: info
    });
  },
  // 获取当前用户下的列表 
  getCurrShopUser: function(id) {
    let shopParams = {
      shopId: id
    };
    // 查询每个商户下的员工
    shopApi.searchUser(shopParams).then((res) => {
      this.setData({
        userList: res.data ? res.data : []
      });
    }).catch((error) => {
      console.log(error);
      wx.showToast({
        title: error.message ? error.message : '获取数据失败',
        icon: 'none',
        duration: 2000
      })
    })
  }
})