// const AV = require('../../utils/av-weapp.js')
var shopApi = require('../../http/shopApi.js').default;
var util = require('../../utils/util.js');
Page({
  data: {
    cartObj: {},
    minusStatuses: {},
    selectedAllStatus: false,
    total: '0.00',
    startX: 0,
    itemLefts: {}
  },
  // 添加商品
  addShop: function() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  bindMinus: function(e) {
    // loading提示
    wx.showLoading({
    	title: '操作中',
    	mask: true
    });
    var listIndex = parseInt(e.currentTarget.dataset.index);
    var objIndex = parseInt(e.currentTarget.dataset.idx);
    var num = this.data.cartObj[objIndex].carts[listIndex].quantity;
    // 如果只有1件了，就不允许再减了
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 购物车数据
    var cartObj = this.data.cartObj;
    cartObj[objIndex].carts[listIndex].quantity = num;
    // 按钮可用状态
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[objIndex] = Array.isArray(minusStatuses[objIndex]) ? minusStatuses[objIndex] : [];
    minusStatuses[objIndex][listIndex] = minusStatus;
    // 将数值与状态写回
    this.setData({
      cartObj: cartObj,
      minusStatuses: minusStatuses
    }, function() {
      wx.hideLoading();
    });
    this.sum();
  },
  bindPlus: function(e) {
    wx.showLoading({
      title: '操作中',
      mask: true
    });
    var listIndex = parseInt(e.currentTarget.dataset.index);
    var objIndex = parseInt(e.currentTarget.dataset.idx);
    var num = this.data.cartObj[objIndex].carts[listIndex].quantity;
    // 自增
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 购物车数据
    var cartObj = this.data.cartObj;
    cartObj[objIndex].carts[listIndex].quantity = num;
    // 按钮可用状态
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[objIndex] = Array.isArray(minusStatuses[objIndex]) ? minusStatuses[objIndex] : [];
    minusStatuses[objIndex][listIndex] = minusStatus;
    // 将数值与状态写回
    this.setData({
      cartObj: cartObj,
      minusStatuses: minusStatuses
    }, function() {
      wx.hideLoading();
    });
    this.sum();
  },
  bindManual: function(e) {
    wx.showLoading({
      title: '操作中',
      mask: true
    });
    var listIndex = parseInt(e.currentTarget.dataset.index);
    var objIndex = parseInt(e.currentTarget.dataset.idx);
    var num = this.data.cartObj[objIndex].carts[listIndex].quantity;
    var cartObj = this.data.cartObj;
    var num = parseInt(e.detail.value);
    cartObj[objIndex].carts[listIndex].quantity = num;
    // 将数值与状态写回
    this.setData({
      cartObj: cartObj
    }, function() {
      wx.hideLoading();
    });
    this.sum();
  },
  bindManualTapped: function() {
    // 什么都不做，只为打断跳转
  },
  bindCheckbox: function(e) {
    wx.showLoading({
      title: '操作中',
      mask: true
    });
    /*绑定点击事件，将checkbox样式改变为选中与非选中*/
    //拿到下标值，以在carts作遍历指示用
    var listIndex = parseInt(e.currentTarget.dataset.index);
    var objIndex = parseInt(e.currentTarget.dataset.idx);
    //原始的icon状态
    var selected = this.data.cartObj[objIndex].carts[listIndex].selected;
    var cartObj = this.data.cartObj;
    var selectedAllStatus = this.data.selectedAllStatus;
    // 对勾选状态取反
    cartObj[objIndex].carts[listIndex].selected = !selected;
    var carts = cartObj[objIndex].carts;
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        cartObj[objIndex].selectedAll = true;
      } else {
        cartObj[objIndex].selectedAll = false;
        break
      }
    }
    for (var item in cartObj) {
      if (cartObj[item].selectedAll) {
        selectedAllStatus = true;
      } else {
        selectedAllStatus = false;
        break;
      }
    }
    // 写回经点击修改后的数组
    this.setData({
      cartObj: cartObj,
      selectedAllStatus: selectedAllStatus
    }, function() {
      wx.hideLoading();
    });
    this.sum();
  },
  bindSelectAll: function() {
    wx.showLoading({
      title: '操作中',
      mask: true
    });
    // 环境中目前已选状态
    var selectedAllStatus = this.data.selectedAllStatus;
    // 取反操作
    selectedAllStatus = !selectedAllStatus;
    // 购物车数据，关键是处理selected值
    var cartObj = this.data.cartObj;
    // 遍历
    for (var item in cartObj) {
      cartObj[item].selectedAll = selectedAllStatus;
      var carts = cartObj[item].carts;
      for (var i = 0; i < carts.length; i++) {
        carts[i].selected = selectedAllStatus;
      }
    }
    this.setData({
      selectedAllStatus: selectedAllStatus,
      cartObj: cartObj,
    }, function() {
      wx.hideLoading();
    });
    this.sum();

  },
  bindCheckout: function() {
    var cartIds = this.calcIds();
    if (cartIds.length) {
      cartIds = cartIds.join(',');
      wx.navigateTo({
        url: '../orderSubmit/orderSubmit?cartIds=' + cartIds + '&amount=' + this.data.total
      });
    }
  },
  delete: function(e) {
    var that = this;
    // 购物车单个删除
    var objectId = e.currentTarget.dataset.objectId;
    console.log(objectId);
    wx.showModal({
      title: '提示',
      content: '确认要删除吗',
      success: function(res) {
        if (res.confirm) {
          console.log('删除成功');
        }
      }
    })
  },
  calcIds: function() {
    // 遍历取出已勾选的cid
    // var buys = [];
    var cartIds = [];
    var cartObj = this.data.cartObj;
    for (var item in cartObj) {
      var carts = cartObj[item].carts;
      for (var i = 0; i < carts.length; i++) {
        if (carts[i].selected) {
          // 移动到Buy对象里去
          // cartIds += ',';
          cartIds.push(carts[i].objectId);
        }
      }
    }
    if (cartIds.length <= 0) {
      wx.showToast({
        title: '请勾选商品',
        icon: 'success',
        duration: 1000
      })
    }
    return cartIds;
  },
  selectedAll: function(e) {
    var cartObj = this.data.cartObj;
    var index = parseInt(e.currentTarget.dataset.index);
    var carts = cartObj[index].carts;
    var selected = cartObj[index].selectedAll = !cartObj[index].selectedAll;
    // 环境中目前已选状态
    var selectedAllStatus = this.data.selectedAllStatus;
    // 判断是否全选
    for (var item in cartObj) {
      console.log(cartObj[item].selectedAll);
      if (cartObj[item].selectedAll) {
        selectedAllStatus = true;
      } else {
        selectedAllStatus = false;
        break;
      }
    }
    // 单个店铺选择
    for (var i = 0; i < carts.length; i++) {
      carts[i].selected = selected;
    }
    this.setData({
      cartObj: cartObj,
      selectedAllStatus: selectedAllStatus
    })
    this.sum();
  },
  onShow: function() {
    let sj_userId = wx.getStorageSync('sj_userId')
    if (sj_userId) {
      this.getData();
    } else {
      let url = util.getCurrentPageUrl();
      wx.setStorageSync('goBackPageURL', url)
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }
  },
  
  // 获取数据
  getData: function () {
    // let params = {
    //   userId: 'sssss'
    // };
    // shopApi.searchCar(params)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    var cartObj = [{
      id: 1,
      storeName: '水果旗舰店1',
      selectedAll: false,
      carts: [{
        objectId: 1,
        selected: false,
        quantity: 1,
        goods: {
          objectId: 1,
          avatar: '../../images/cai.jpg',
          title: '小宝贝',
          price: 12,
          type: '上品'
        }
      }, {
        objectId: 1,
        selected: false,
        quantity: 10,
        goods: {
          objectId: 2,
          avatar: '../../images/cai.jpg',
          title: '小宝贝',
          price: 12,
          type: '上品'
        }
      }, {
        objectId: 1,
        selected: false,
        quantity: 10,
        goods: {
          objectId: 3,
          avatar: '../../images/cai.jpg',
          title: '小宝贝',
          price: 12,
          type: '上品'
        }
      }]
    }, {
      id: 2,
      storeName: '水果旗舰店2',
      selectedAll: false,
      carts: [{
        objectId: 1,
        selected: false,
        quantity: 10,
        goods: {
          objectId: 4,
          avatar: '../../images/cai.jpg',
          title: '小宝贝',
          price: 12,
          type: '上品'
        }
      }, {
        objectId: 1,
        selected: false,
        quantity: 10,
        goods: {
          objectId: 5,
          avatar: '../../images/cai.jpg',
          title: '小宝贝',
          price: 12,
          type: '上品'
        }
      }, {
        objectId: 1,
        selected: false,
        quantity: 10,
        goods: {
          objectId: 6,
          avatar: '../../images/cai.jpg',
          title: '小宝贝',
          price: 12,
          type: '上品'
        }
      }]
    }];
    this.setData({
      cartObj: cartObj
    })
  },
  sum: function() {
    var cartObj = this.data.cartObj;
    // 计算总金额
    var total = 0.00;
    for (var obj in cartObj) {
      var carts = cartObj[obj]['carts'];
      for (var i = 0; i < carts.length; i++) {
        if (carts[i].selected) {
          total += carts[i].quantity * carts[i].goods.price;
        }
      }
    }
    total = total.toFixed(2);
    // 写回经点击修改后的数组
    this.setData({
      cartObj: cartObj,
      total: total
    });
  },
  showGoods: function(e) {
    // 点击购物车某件商品跳转到商品详情
    var objectId = e.currentTarget.dataset.objectId;
    // wx.navigateTo({
    // 	url: '../goods/detail/detail?objectId=' + objectId
    // });
  },
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