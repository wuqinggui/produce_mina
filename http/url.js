export const baseUrl = 'https://47.106.130.46:8016/trade/';

// 用户模块
export const loginURL = baseUrl + 'nmUser/login'; // 登陆
export const tokenURL = baseUrl + 'nmUser/getToken'; // 根据token获取用户信息

// 商城首页
export const regionUrl = baseUrl + 'region/findAll'; // 获取所有地区的接口
export const shopClassUrl = baseUrl + 'shopclass/findAll'; // 查询大分类的接口
export const shopSmallClassUrl = baseUrl + 'shopsmallclass/findList'; // 查询小分类的接口
export const commodityListUrl = baseUrl + 'commodity/findList'; // 根据小分类查询所有商品的接口
export const buyShopUrl = baseUrl + 'shop/searchByShop'; // 查询可下单的店铺列表
// 购物车
export const addCarUrl = baseUrl + 'shoppingcart/add'; // 将商品保存到购物车的接口
export const carShopUrl = baseUrl + 'shop/findList'; // 查询购物车的店铺数据
export const getCarUrl = baseUrl + 'shoppingcart/findList'; // 根据购物车当前用户ID查询购物车中的商品
export const updateCarUrl = baseUrl + 'shoppingcart/update'; // 修改购物车商品数据
export const deleteCarUrl = baseUrl + 'shoppingcart/delete'; // 从购物车中删除商品的接口
// 订单
export const addOrderUrl = baseUrl + 'order/add'; // 下单接口
export const orderListUrl = baseUrl + 'order/findByUserId'; // 订单查询接口
// 店铺
export const addShopUrl = baseUrl + 'shop/add'; // 新增店铺接口（含申请入驻的接口）
export const updateShopUrl = baseUrl + 'shop/update'; // 修改店铺接口
export const findShopByIDUrl = baseUrl + 'shop/findShopByID'; // 根据店铺id查询该店铺下所有的店铺
// 员工
export const addUserUrl = baseUrl + 'nmUser/add'; // 员工添加
export const updateUserUrl = baseUrl + 'nmUser/update'; // 员工修改
export const findUserUrl = baseUrl + 'nmUser/findAll'; // 员工查询
export const searchUserUrl = baseUrl + 'nmUser/search'; // 员工搜素
// 店铺管理
export const shopListUrl = baseUrl + 'shop/findAll'; //店铺列表管理
export const deleteShopUrl = baseUrl + 'shop/delete'; //删除店铺 店铺管理
export const findListShopUrl = baseUrl + 'shop/findList'; //多条件搜索店铺
export const findByUserIdUrl = baseUrl + 'shop/findByUserId'; //用户搜店铺
// 收货地址
export const addAddressUrl = baseUrl + 'address/add'; // 新增收货地址
export const searchAddressListUrl = baseUrl + 'address/findAll'; // 收货地址列表
export const findByIdAddressUrl = baseUrl + 'address/findById'; // 搜索
export const updateAddressUrl = baseUrl + 'address/update'; // 修改地址
// 客户类型
export const customertypeListUrl = baseUrl + 'customertype/findAll'; // 客户类型
