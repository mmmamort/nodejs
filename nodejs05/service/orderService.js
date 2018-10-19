// total: {
//     type: String
// },
// status: {
//     type: String, // 订单状态: unpay success cancel
// default: "unpay"
// },
// created: {
//     type: Date,
// default: Date.now(),
// },
// payTime: {
//     type: Date
// },
// cancelTime: Date

const Order = require("../model/order");
const productService = require("../service/productService");
const config = require("../config");
const Big = require("big.js")

/**
 * 添加订单
 * post http://localhost/order/add
 * @param order{productId:ObjectId,count:Number,total:String}
 * @returns {Promise<void>}
 */
async function addItem(order) {
    //商品查询
    let product = await productService.findById(order.productId);
    if (!product) throw new Error(`${order.productName},商品不存在`)
    //检查库存
    if (order.count > product.stock) throw new Error(`${order.productName},商品库存不足`)
    //扣减库存
    await productService.updateById(order.productId, {stock: product.stock - order.count})
    //订单属性赋值
    order.productName = product.name
    order.productPrice = product.price
    order.total = Big(product.price).times(order.count)
    //查询订单中的商品，若存在数量、总价累加，不存在新建订单
    let result = await findByProductId(order.productId);
    if (!result) return await Order.create(order)
    await update(result, {count: result.count + order.count, total: Big(result.total).plus(order.total)})
    return await Order.findOne({productId: order.productId})
}

/**
 * 分页查询
 * delete http://localhost/order/query/{page}
 * @param page
 * @returns {Promise<*>}
 */
async function findByPage(page = 1) {
    let offset = (page - 1) * config.pageSize
    return await Order.find().skip(offset).limit(config.pageSize);
}

/**
 * 更新订单
 * @param order
 * @param newOrder
 * @returns {Promise<void>}
 */
async function update(order, newOrder) {
    let result = await Order.updateOne(order, newOrder)
    if (result.n != 1) throw new Error("更新失败")
}

/**
 * 查询订单商品
 * @param name
 * @returns {Promise<*>}
 */
async function findByProductId(productId) {
    return await Order.findOne({productId: productId});
}

module.exports = {addItem, findByPage}