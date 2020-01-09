var req = require('../utils/http.js').default;

var indexApi = {
  // 首页-城市下拉列表
  getIndexCity: function (params) {
    return new Promise((resolve, reject) => {
      req.get('indexCity', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 首页-数据
  getIndexList: function (params) {
    return new Promise((resolve, reject) => {
      req.get('indexList', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
}
export default indexApi;