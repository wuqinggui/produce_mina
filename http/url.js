// export const baseUrl = 'https://47.106.130.46:8016/trade/';
// export const baseUrl = 'https://qxkj.org.cn:8019/trade/';
export const baseUrl = 'https://www.yuannong.shop:8015/trade/';

// 用户模块
export const loginWxUrl = baseUrl + 'nmUser/loginWx'; // 微信登录注册
export const loginURL = baseUrl + 'nmUser/login'; // 登陆
export const tokenURL = baseUrl + 'nmUser/getToken'; // 根据token获取用户信息

// 商城首页
export const regionUrl = baseUrl + 'region/findAll'; // 获取所有地区的接口
export const shopClassUrl = baseUrl + 'shopclass/findAll'; // 查询大分类的接口
export const shopSmallClassUrl = baseUrl + 'shopsmallclass/findList'; // 查询小分类的接口
export const commodityListUrl = baseUrl + 'commodity/findListByCustomercommodity'; // 根据小分类查询所有商品的接口
export const buyShopUrl = baseUrl + 'shop/searchByShop'; // 查询可下单的商户列表
// 购物车
export const addCarUrl = baseUrl + 'shoppingcart/add'; // 将商品保存到购物车的接口
export const carShopUrl = baseUrl + 'shop/findList'; // 查询购物车的商户数据
export const getCarUrl = baseUrl + 'shoppingcart/findList'; // 根据购物车当前用户ID查询购物车中的商品
export const updateCarUrl = baseUrl + 'shoppingcart/update'; // 修改购物车商品数据
export const deleteCarUrl = baseUrl + 'shoppingcart/delete'; // 从购物车中删除商品的接口
// 店铺 / 用户中间表
export const getUserShopUrl = baseUrl + 'shopUser/getShops'; // 获取用户下所有的店铺id
export const getNmUsersUrl = baseUrl + 'shopUser/getNmUsers'; // 获取员工列表
// 支付
export const payTimeUrl = baseUrl + 'switchSet/findAll'; // 可支付下单的时间段
export const payParamsUrl = baseUrl + 'payment/toPay'; // 支付
// 订单
export const addOrderUrl = baseUrl + 'order/add'; // 下单接口
export const getOrderUrl = baseUrl + 'order/findList'; // 订单查询接口
export const orderUpdateUrl = baseUrl + 'order/update'; // 订单修改接口
export const orderDeleteUrl = baseUrl + 'order/delete'; // 订单删除接口
// 商户
export const addShopUrl = baseUrl + 'shop/add'; // 新增商户接口（含申请ruzhu的接口）
export const updateShopUrl = baseUrl + 'shop/update'; // 修改商户接口
export const findShopByIDUrl = baseUrl + 'shop/findShopByID'; // 根据商户id查询该商户下所有的商户
// 员工
export const addUserUrl = baseUrl + 'nmUser/add'; // 员工添加
export const updateUserUrl = baseUrl + 'nmUser/update'; // 员工修改
export const updateWxUserUrl = baseUrl + 'nmUser/updateWx'; // 员工修改(微信)
export const findUserUrl = baseUrl + 'nmUser/findAll'; // 员工查询
export const searchUserUrl = baseUrl + 'nmUser/search'; // 员工搜素
export const findListSqNmUsersUrl = baseUrl + 'nmUser/findListSqNmUsers'; // 用户搜素
// 商户管理
export const shopListUrl = baseUrl + 'shop/findAll'; //商户列表管理
export const deleteShopUrl = baseUrl + 'shop/delete'; //删除商户 商户管理
export const findListShopUrl = baseUrl + 'shop/findList'; //多条件搜索商户
export const findByUserIdUrl = baseUrl + 'shop/findByUserId'; //用户搜商户
export const findMoreShopByIdUrl = baseUrl + 'shop/findMoreShopById'; //根据商户id查找商户
// 收货地址
export const addAddressUrl = baseUrl + 'address/add'; // 新增收货地址
// export const searchAddressListUrl = baseUrl + 'address/findAll'; // 收货地址列表
export const searchAddressListUrl = baseUrl + 'address/findList'; // 收货地址列表
export const findByIdAddressUrl = baseUrl + 'address/findById'; // 搜索
export const updateAddressUrl = baseUrl + 'address/update'; // 修改地址
// 客户类型
export const customertypeListUrl = baseUrl + 'customertype/findAll'; // 客户类型
