// pages/staffManage/staffManage.js
var util = require('../../utils/util.js');
var shopApi = require('../../http/shopApi.js').default;
var MD5 = require('../../utils/md5.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    btnStatus: 1, // 点击按钮新增(1)还是修改(2)
    info: {}, // 新增修改数据
    showNone: false,
    inputValue: '',
    worktype: '',
    showOneButtonDialog: false,
    oneButton: [{
      text: '添加'
    }],
    oneButton2: [{
      text: '确定'
    }],
    address: [], // 地区选择列表
    userRoles: [{ // 工种
        id: 1,
        name: '下单人员'
      },
      {
        id: 2,
        name: '收货人员'
      },
      {
        id: 3,
        name: '付款人员'
      },
      {
        id: 4,
        name: '管理人员'
      }
    ],
    shopList: [], // 店铺列表
    list: [] // 员工列表
  },
  selectShop: function() {

  },
  // 地址选择
  bindPickerChange: function(e) {
    var address = this.data.address;
    let params = {
      regionId: e.detail.value
    };
    shopApi.searchUser(params).then((res) => {
      if (res.data) {
        res.data.forEach((item) => {
          if (item.userRole == 1) {
            item.roleName = '下单人员';
          } else if (item.userRole == 2) {
            item.roleName = '收货人员';
          } else if (item.userRole == 3) {
            item.roleName = '付款人员';
          } else if (item.userRole == 4) {
            item.roleName = '管理人员';
          }
        })
        this.setData({
          list: res.data
        });
      }
    }).catch((error) => {
      console.log(error);
      wx.showToast({
        title: error.message ? error.message : '获取数据失败',
        icon: 'none',
        duration: 2000
      })
    })
    this.setData({
      inputValue: address[e.detail.value].name
    })
  },
  // 选择店铺
  bindPickerChange2: function(e) {
    var shopList = this.data.shopList;
    var info = this.data.info;
    var index = e.detail.value;
    info.merchantName = shopList[e.detail.value].merchantName;
    info.shopId = shopList[e.detail.value].id;
    console.log('picker发送选择改变，携带值为', shopList[e.detail.value])
    this.setData({
      info: info
    })
  },
  // 选择工种
  bindPickerChange3: function(e) {
    var userRoles = this.data.userRoles;
    var info = this.data.info;
    info.userRoleName = userRoles[e.detail.value].name;
    info.userRole = userRoles[e.detail.value].id;
    this.setData({
      info: info
    })
  },
  // 确定修改或新增
  tapDialogButton(e) {
    let data = this.data;
    let toastTxt = '';
    if (!data.info.userRole) {
      toastTxt = '请输入工种';
    } else if (!data.info.nickname) {
      toastTxt = '请输入员工名';
    } else if (!data.info.phone) {
      toastTxt = '请输入联系电话';
    } else if (!/^1[3|4|5|7|8]\d{9}$/.test(data.info.phone)) {
      toastTxt = '手机号码格式，请重新输入';
    } else if (!data.info.userName) {
      toastTxt = '请输入用户名';
    } else if (data.btnStatus == 1 && !data.info.password) {
      toastTxt = '请输入密码';
    }
    if (toastTxt) {
      return wx.showToast({
        title: toastTxt,
        icon: 'none',
        duration: 2000
      })
    }
    data.info.userType = wx.getStorageSync('sj_userInfo').userType; // 用户类型
    data.info.regionId = wx.getStorageSync('sj_userInfo').regionId; //地区ID
    data.info.shopId = wx.getStorageSync('shopId');
    data.info.userId = data.userId;
    data.info.password = MD5.hexMD5(data.info.password)
    let params = data.info;
    // 新增员工
    if (data.btnStatus == 1) {
      shopApi.addUser(params).then((res) => {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })
        this.getUserList();
      }).catch((error) => {
        console.log(error);
        wx.showToast({
          title: error.message ? error.message : '获取数据失败',
          icon: 'none',
          duration: 2000
        })
      })
    } else { // 修改员工
      shopApi.updateUser(params).then((res) => {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
        this.getUserList();
      }).catch((error) => {
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
  bindAndSet: function(e) {
    let key = e.currentTarget.dataset.key;
    let info = this.data.info;
    info[key] = e.detail.value;
    this.setData({
      info: info
    })
  },
  // 新增员工
  addUser: function() {
    let info = {
      userName: '',
      password: '',
      shopId: '',
      userRole: '',
      userRoleName: '',
      phone: '',
      nickname: ''
    };
    this.setData({
      info: info,
      btnStatus: 1,
      showOneButtonDialog: true
    })
  },
  // 编辑员工
  editItem: function(e) {
    let index = e.currentTarget.dataset.index;
    let list = this.data.list;
    // let params = {
    //   shopId: list[index].shopId
    // };
    this.setData({
      info: list[index],
      btnStatus: 2,
      showOneButtonDialog: true
    })
    // shopApi.findMoreShopById(params).then((res) => {
    //   let shopInfo = res.data.find((item) => {
    //     return list[index].shopId == item.id;
    //   })
    //   this.setData({
    //     info: list[index],
    //     btnStatus: 2,
    //     showOneButtonDialog: true
    //   })
    // }).catch((error) => {
    //   console.log(error);
    //   wx.showToast({
    //     title: error.message ? error.message : '获取数据失败',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // })
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
      this.setData({
        userId: sj_userId
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
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    this.getAddress();
    this.getUserList();
    // this.getShopList();
  },
  // 获取员工列表
  getUserList: function() {
    let params = {
      userId: this.data.userId
    };
    let list = [];
    let _this = this;
    // 查询该登录用户下的店铺
    shopApi.findListShop(params).then((res) => {
      wx.hideLoading();
      if (res.data.length) {
        res.data.forEach((shopItem) => {
          let shopParams = {
            shopId: shopItem.id
          };
          // 查询每个店铺下的员工
          shopApi.searchUser(shopParams).then((userRes) => {
            userRes.data && userRes.data.forEach((item) => {
              list.push(item);
            })
            _this.setData({
              showNone: true,
              list: list
            })
          })
        })
      } else {
        _this.setData({
          showNone: true,
          list: list
        })
      }
    }).catch((error) => {
      console.log(error);
      wx.showToast({
        title: error.message ? error.message : '获取数据失败',
        icon: 'none',
        duration: 2000
      })
    })
  },
  // 获取地区
  getAddress: function() {
    shopApi.region().then((res) => {
      this.setData({
        address: res.data ? res.data : []
      });
    }).catch((error) => {
      console.log(error);
      wx.showToast({
        title: error.message ? error.message : '获取数据失败',
        icon: 'none',
        duration: 2000
      })
    })
  },
  // 获取店铺列表
  getShopList: function() {
    shopApi.shopList().then((res) => {
      this.setData({
        shopList: res.data ? res.data : []
      });
    }).catch((err) => {
      wx.showToast({
        title: error.message ? error.message : '获取数据失败',
        icon: 'none',
        duration: 2000
      })
    })
  }
})