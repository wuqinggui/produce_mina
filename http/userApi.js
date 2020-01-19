var wxRequest = require('./request.js').wxRequest;
import { loginURL, tokenURL  } from './url'

var userApi = {
  login: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(loginURL, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  token: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(tokenURL, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  }
}

export default userApi;