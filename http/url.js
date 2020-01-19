export const baseUrl = 'http://localhost:8015/trade/';

// 用户模块
export const loginURL = baseUrl + 'wechat/user/login'; // 微信登陆
export const getPhonenumberURL = baseUrl + 'wechat/user/getPhonenumber'; // 用户手机信息
export const getUserInfoUrl = baseUrl + 'wechat/user/getUserInfo'; // 获取用户信息
export const updateUserInfoUrl = baseUrl + 'wechat/user/updateUserInfo'; // 更新用户信息

// 商城接口
export const findAll = baseUrl + 'region/findAll'; // 获取所有地区的接口
export const findList = baseUrl + 'commodity/findList'; // 根据小分类查询所有商品的接口
export const addCar = baseUrl + 'shoppingcart/add'; // 将商品保存到购物车的接口
export const searchCar = baseUrl + 'shoppingcart/findList'; // 根据购物车当前用户ID查询购物车中的商品
export const deleteCar = baseUrl + 'shoppingcart/delete'; // 从购物车中删除商品的接口
export const listPay = baseUrl + 'order/add'; // 下单接口
export const findByUserId = baseUrl + 'order/findByUserId'; // 订单查询接口
export const addShop = baseUrl + 'shop/add'; // 新增店铺接口（含申请入驻的接口）
export const updateShop = baseUrl + 'shop/update'; // 修改店铺接口
export const findShopByID = baseUrl + 'shop/findShopByID'; // 根据店铺id查询该店铺下所有的店铺
export const addUser = baseUrl + 'nmUser/add'; // 员工添加
export const updateUser = baseUrl + 'nmUser/update'; // 员工修改
export const findUser = baseUrl + 'nmUser/findList'; // 员工查询