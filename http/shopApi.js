var wxRequest = require('./request.js').wxRequest;
import { 
  findAllUrl,
  findListUrl,
  addCarUrl,
  searchCarUrl,
  deleteCarUrl,
  listPayUrl,
  findByUserIdUrl,
  addShopUrl,
  updateShopUrl,
  findShopByIDUrl,
  addUserUrl,
  updateUserUrl,
  findUserUrl
} from './url'

var shopApi = {
  findAll: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(findAllUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  findList: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(findListUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  addCar: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(addCarUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  searchCar: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(searchCarUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  deleteCar: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(deleteCarUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  listPay: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(listPayUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  findByUserId: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(findByUserIdUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  addShop: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(addShopUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  updateShop: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(updateShopUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  findShopByID: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(findShopByIDUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  addUser: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(addUserUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  updateUser: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(updateUserUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  findUser: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(findUserUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  }
}

export default shopApi;