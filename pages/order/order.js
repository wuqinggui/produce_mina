// pages/order/order.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    activeNav: 'all',
    navs: [{
      text: '全部',
      alias: 'all'
    }, {
      text: '待付款',
      alias: 'unpaid'
    }, {
      text: '待发货',
      alias: 'undelivered'
    }, {
      text: '待收货',
      alias: 'unreceived'
      }, {
        text: '退货/退款',
        alias: 'returnGoods'
      }],
    orderList: []
  },


  changeList(e) {
    const that = this;
    const alias = e.target.dataset.alias;
    if (alias !== this.data.activeNav) {
      this.setData({
        activeNav: e.target.dataset.alias,
        // loading: true
      });
      // this.getList().then((res) => {
      //   that.setOrderData(res.data);
      //   that.setData({
      //     orderList: res.data,
      //     loading: false
      //   });
      // });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var orderList = [{
      flexible: true,
      address: "123123",
      admin_note: "",
      city: "北京市",
      confirm_time: "0000-00-00 00:00:00",
      consignee: "322",
      country: "中国",
      created_at: "2016-12-26 11:51:29",
      district: "北京市",
      goodsList: [{
        created_at: "2016-12-26 11:51:29",
        goods_attr: "口味:甜; 尺寸:L; ",
        goods_id: 1,
        goods_name: "仙美XM1",
        goods_number: 100,
        goods_sn: "上品",
        market_price: 6,
        price: 5,
        real_price: 5,
        shop_price: 6,
        sku_id: 6,
        sum_price: "12.00",
        thumb_url: "http://img13.360buyimg.com/n1/jfs/t3655/151/1971152678/274261/fb508f8c/5840d683Na2190edd.jpg"
      },{
        created_at: "2016-12-26 11:51:29",
        goods_attr: "口味:甜; 尺寸:L; ",
        goods_id: 1,
        goods_name: "仙美XM2",
        goods_number: 100,
        goods_sn: "上品",
        market_price: 6,
        price: 5,
        real_price: 5,
        shop_price: 6,
        sku_id: 6,
        sum_price: "12.00",
        thumb_url: "http://img13.360buyimg.com/n1/jfs/t3655/151/1971152678/274261/fb508f8c/5840d683Na2190edd.jpg"
      }],
      goods_price: 12,
      id: 192,
      logisticsCompanyCode: "qita",
      mobile: "13231231312",
      order: {
        orderStatus: "待支付",
        orderSn: "M161226426899685865",
        subOrderSn: "S161226426899719327",
        isButtonHidden: true
      },
      order_amount: 10,
      order_sn: "M161226426899685865",
      order_status: "待支付",
      order_type: "普通订单",
      parent_id: "192",
      pay_time: "0000-00-00 00:00:00",
      pay_way: "待支付",
      province: "北京市",
      receipt_status: "待收货",
      refund_status: "没有售后",
      shipping_status: "待发货",
      shipping_time: "0000-00-00 00:00:00",
      shop_id: 1,
      sub_order_sn: "S161226426899719327",
      suppliers_id: 0,
      total_amount: 10,
      tuan_role: 0,
      tuan_status: "正常开团",
      updated_at: "2016-12-26 11:51:29",
      user_id: 1835,
      why_failed: "待收货",
    },
      {
        flexible: true,
        address: "123123",
        admin_note: "",
        city: "北京市",
        confirm_time: "0000-00-00 00:00:00",
        consignee: "322",
        country: "中国",
        created_at: "2016-12-26 11:51:29",
        district: "北京市",
        goodsList: [{
          created_at: "2016-12-26 11:51:29",
          goods_attr: "口味:甜; 尺寸:L; ",
          goods_id: 1,
          goods_name: "仙美XM1",
          goods_number: 100,
          goods_sn: "上品",
          market_price: 6,
          price: 5,
          real_price: 5,
          shop_price: 6,
          sku_id: 6,
          sum_price: "12.00",
          thumb_url: "http://img13.360buyimg.com/n1/jfs/t3655/151/1971152678/274261/fb508f8c/5840d683Na2190edd.jpg"
        }, {
          created_at: "2016-12-26 11:51:29",
          goods_attr: "口味:甜; 尺寸:L; ",
          goods_id: 1,
          goods_name: "仙美XM2",
          goods_number: 100,
          goods_sn: "上品",
          market_price: 6,
          price: 5,
          real_price: 5,
          shop_price: 6,
          sku_id: 6,
            sum_price: "12.00",
          thumb_url: "http://img13.360buyimg.com/n1/jfs/t3655/151/1971152678/274261/fb508f8c/5840d683Na2190edd.jpg"
        }],
        goods_price: 12,
        id: 192,
        logisticsCompanyCode: "qita",
        mobile: "13231231312",
        order: {
          orderStatus: "待支付",
          orderSn: "M161226426899685865",
          subOrderSn: "S161226426899719327",
          isButtonHidden: true
        },
        order_amount: 10,
        order_sn: "M161226426899685865",
        order_status: "待支付",
        order_type: "普通订单",
        parent_id: "192",
        pay_time: "0000-00-00 00:00:00",
        pay_way: "待支付",
        province: "北京市",
        receipt_status: "待收货",
        refund_status: "没有售后",
        shipping_status: "待发货",
        shipping_time: "0000-00-00 00:00:00",
        shop_id: 1,
        sub_order_sn: "S161226426899719327",
        suppliers_id: 0,
        total_amount: 10,
        tuan_role: 0,
        tuan_status: "正常开团",
        updated_at: "2016-12-26 11:51:29",
        user_id: 1835,
        why_failed: "待收货",
      }];
    this.setData({
      orderList: orderList
    });
  },
  OpenClose: function(e) {
    var index = e.currentTarget.dataset.index;
    var orderList = this.data.orderList;
    var flag = orderList[index].flexible;
    orderList[index].flexible = !flag;
    this.setData({
      orderList: orderList
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
  onShow: function() {},

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

  }
})