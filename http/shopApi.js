var wxRequest = require('./request.js').wxRequest;
import { 
  regionUrl,
  shopClassUrl,
  shopSmallClassUrl,
  commodityListUrl,
  addCarUrl,
  getCarUrl,
  deleteCarUrl,
  addOrderUrl,
  orderListUrl,
  addShopUrl,
  updateShopUrl,
  findShopByIDUrl,
  addUserUrl,
  updateUserUrl,
  findUserUrl
} from './url'

var shopApi = {
  // 获取所有地区的接口
  region: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(regionUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 查询大分类的接口
  shopClass: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(shopClassUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 查询小分类的接口
  shopSmallClass: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(shopSmallClassUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 根据小分类查询所有商品的接口
  commodityList: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(commodityListUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 将商品保存到购物车的接口
  addCar: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(addCarUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 根据购物车当前用户ID查询购物车中的商品
  getCar: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(getCarUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 从购物车中删除商品的接口
  deleteCar: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(deleteCarUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 下单接口
  addOrder: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(addOrderUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 订单查询接口
  orderList: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(orderListUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 新增店铺接口（含申请入驻的接口）
  addShop: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(addShopUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 修改店铺接口
  updateShop: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(updateShopUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 根据店铺id查询该店铺下所有的店铺
  findShopByID: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(findShopByIDUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 员工添加
  addUser: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(addUserUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 员工修改
  updateUser: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(updateUserUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 员工查询
  findUser: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(findUserUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  }
}

export default shopApi;