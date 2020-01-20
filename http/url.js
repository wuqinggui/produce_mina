export const baseUrl = 'https://47.106.130.46:8016/trade/';

// 用户模块
export const loginURL = baseUrl + 'nmUser/login'; // 登陆
export const tokenURL = baseUrl + 'nmUser/getToken'; // 根据token获取用户信息

// 商城接口
export const findAllUrl = baseUrl + 'region/findAll'; // 获取所有地区的接口
export const findListUrl = baseUrl + 'commodity/findList'; // 根据小分类查询所有商品的接口
export const addCarUrl = baseUrl + 'shoppingcart/add'; // 将商品保存到购物车的接口
export const getCarUrl = baseUrl + 'shoppingcart/findList'; // 根据购物车当前用户ID查询购物车中的商品
export const deleteCarUrl = baseUrl + 'shoppingcart/delete'; // 从购物车中删除商品的接口
export const listPayUrl = baseUrl + 'order/add'; // 下单接口
export const findByUserIdUrl = baseUrl + 'order/findByUserId'; // 订单查询接口
export const addShopUrl = baseUrl + 'shop/add'; // 新增店铺接口（含申请入驻的接口）
export const updateShopUrl = baseUrl + 'shop/update'; // 修改店铺接口
export const findShopByIDUrl = baseUrl + 'shop/findShopByID'; // 根据店铺id查询该店铺下所有的店铺
export const addUserUrl = baseUrl + 'nmUser/add'; // 员工添加
export const updateUserUrl = baseUrl + 'nmUser/update'; // 员工修改
export const findUserUrl = baseUrl + 'nmUser/findList'; // 员工查询