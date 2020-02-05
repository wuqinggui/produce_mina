// pages/addAddress/addAddress.js
var util = require('../../utils/util.js');
var shopApi = require('../../http/shopApi.js').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    region: [],
    customItem: '',
    valObj: {
      name: '',
      phone: '',
      regional: '',
      addresses: ''
    },
    list: [{
      tip: 'people',
      name: '收货人',
      placeholder: '请输入收货人'
    }, {
      tip: 'phone',
      name: '电话',
      placeholder: '收货人手机号'
    }, {
      tip: 'province',
      name: '地区',
      placeholder: '选择市/省/区'
    }, {
      tip: 'address',
      name: '详细地址',
      placeholder: '街道门牌,楼层房间号等信息'
    }]
  },
  enter: function() {
    console.log(this.data.list);
  },
  // 收货人
  changePeople: function(e) {
    var valObj = this.data.valObj;
    valObj.name = e.detail.value;
    this.setData({
      valObj: valObj
    });
  },
  // 电话
  changePhone: function(e) {
    var valObj = this.data.valObj;
    valObj.phone = e.detail.value;
    this.setData({
      valObj: valObj
    });
  },
  // 详细地址
  changeAddress: function(e) {
    var valObj = this.data.valObj;
    valObj.addresses = e.detail.value;
    this.setData({
      valObj: valObj
    });
  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var valObj = this.data.valObj;
    valObj.regional = e.detail.value;
    this.setData({
      region: e.detail.value,
      valObj: valObj
    })
  },
  showToast(title, duartion) {
    const that = this;
    wx.showToast({
      title: title || '',
      icon: 'none',
      duartion: duartion || 2000,
      isHidden: false
    });
  },
  submit: function() {
    var valObj = this.data.valObj;
    if (!valObj.name) {
      this.showToast('收货人不能为空');
      return;
    }
    if (valObj.name.length < 2) {
      this.showToast('收货人姓名限制为2~15个字符');
      return;
    }
    if (!valObj.phone) {
      this.showToast('手机号不能为空');
      return;
    }
    if (!/^1[3|4|5|7|8]\d{9}$/.test(valObj.phone)) {
      this.showToast('手机格式有误，请重新输入');
      return;
    }
    if (this.data.region.length == 0) {
      this.showToast('省市地址不能为空');
      return;
    }
    if (!valObj.addresses) {
      this.showToast('街道地址不能为空');
      return;
    }
    valObj.addresses = valObj.addresses;
    valObj.regional = valObj.regional.join();
    if(!this.data.id) {
      shopApi.addAddress(valObj).then((res) => {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duartion: 3000,
          success: function () {
            wx.navigateBack({
              delta: 1
            })
          }
        });
      }).catch((error) => {
        console.log(error);
      })
    } else {
      shopApi.updateAddress(valObj).then((res) => {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duartion: 3000,
          success: function () {
            wx.navigateBack({
              delta: 1
            })
          }
        });
      }).catch((error) => {
        console.log(error);
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id
    this.setData({
      id: id
    })
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
    this.getEditData();
  },

  // 修改编辑
  getEditData: function() {
    if(!this.data.id) {
      return false;
    }
    let params = { id: this.data.id };
    shopApi.findByIdAddress(params).then((res) => {
      res.data.regional = res.data.regional.split(",");
      this.setData({
        valObj: res.data,
        region: res.data.regional
      });
    }).catch((error) => {
      console.log(error);
      this.showToast(error.message ? error.message : '获取数据失败');
    })
  }
})