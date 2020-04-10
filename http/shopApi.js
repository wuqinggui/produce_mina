var wxRequest = require('./request.js').wxRequest;
import {
  regionUrl,
  shopClassUrl,
  shopSmallClassUrl,
  commodityListUrl,
  buyShopUrl,
  addCarUrl,
  carShopUrl,
  getCarUrl,
  updateCarUrl,
  deleteCarUrl,
  addOrderUrl,
  payTimeUrl,
  payParamsUrl,
  getOrderUrl,
  orderUpdateUrl,
  orderDeleteUrl,
  shopListUrl,
  addShopUrl,
  findListShopUrl,
  updateShopUrl,
  findShopByIDUrl,
  addUserUrl,
  updateUserUrl,
  findUserUrl,
  searchUserUrl,
  findByUserIdUrl,
  findMoreShopByIdUrl,
  addAddressUrl,
  searchAddressListUrl,
  findByIdAddressUrl,
  updateAddressUrl,
  customertypeListUrl,
  getUserShopUrl,
  getNmUsersUrl,
  findListSqNmUsersUrl,
  updateWxUserUrl
} from './url'

var shopApi = {
  // 获取所有地区的接口
  region: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(regionUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 查询大分类的接口
  shopClass: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(shopClassUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 查询小分类的接口
  shopSmallClass: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(shopSmallClassUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 根据小分类查询所有商品的接口
  commodityList: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(commodityListUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 查询可下单的商户列表
  buyShop:   function (params)  {    
    return  new  Promise((resolve,  reject)  =>  {      
      wxRequest(buyShopUrl,  'POST',  params)        .then((res)  =>  {          
        resolve(res);        
      })        .catch((error)  =>  reject(error))    
    });  
  },
  // 将商品保存到购物车的接口
  addCar: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(addCarUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
    
  // 查询购物车的商户列表
    carShop:   function (params)  {    
    return  new  Promise((resolve,  reject)  =>  {      
      wxRequest(carShopUrl,  'POST',  params)        .then((res)  =>  {          
        resolve(res);        
      })        .catch((error)  =>  reject(error))    
    });  
  },
     // 根据购物车当前用户ID查询购物车中的商品
    getCar:   function (params)  {    
    return  new  Promise((resolve,  reject)  =>  {      
      wxRequest(getCarUrl,  'POST',  params)        .then((res)  =>  {          
        resolve(res);        
      })        .catch((error)  =>  reject(error))    
    });  
  },
  // 修改购物车商品数据
  updateCar: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(updateCarUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
    
  // 从购物车中删除商品的接口
  deleteCar: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(deleteCarUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 下单接口
  addOrder: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(addOrderUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 可支付下单的时间段
  payTime: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(payTimeUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 支付参数接口
  payParams: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(payParamsUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 订单查询接口
  getOrder: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(getOrderUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 订单修改接口
  orderUpdate: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(orderUpdateUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 订单删除接口
  orderDelete: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(orderDeleteUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 商户管理列表
  shopList: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(shopListUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 新增商户接口（含申请ruzhu管理的接口）
  addShop: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(addShopUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 修改商户接口
  updateShop: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(updateShopUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 搜素商户
  findListShop: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(findListShopUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 根据商户id查询该商户下所有的商户
  findShopByID: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(findShopByIDUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 员工添加
  addUser: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(addUserUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 员工修改
  updateUser: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(updateUserUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 员工查询
  findUser: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(findUserUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 用户id搜商户
  findShopByUserId: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(findByUserIdUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 商户id搜商户
  findMoreShopById: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(findMoreShopByIdUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 员工搜素
  searchUser: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(searchUserUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 收货地址列表
  addressList: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(searchAddressListUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 收货地址列表
  addAddress: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(addAddressUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 编辑搜索收货地址
  findByIdAddress: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(findByIdAddressUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 修改收货地址
  updateAddress: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(updateAddressUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });

  },
  // 获取客户类型列表
  customertypeList: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(customertypeListUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 获取用户下的所有店铺和子店铺
  getUserShop: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(getUserShopUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 获取员工列表
  getNmUsers: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(getNmUsersUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  }, 
  // 获取用户列表
  findListSqNmUsers: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(findListSqNmUsersUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  }, 
  // 修改微信信息
  updateWxUser: function(params) {
    return new Promise((resolve, reject) => {
      wxRequest(updateWxUserUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  }
}

export default shopApi;