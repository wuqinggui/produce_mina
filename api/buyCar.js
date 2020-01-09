var req = require('../utils/http.js').default;

var buyCarApi = {
  // 首页-城市下拉列表
  getIndexCity: function (params) {
    return new Promise((resolve, reject) => {
      req.get('indexCity', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  }
}
export default buyCarApi;