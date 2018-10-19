const Product = require("../model/product");
let categoryService = require("../service/categoryService");
const config = require("../config");

/**
 * 添加商品
 * post http://localhost/product/add
 * @param product{name:String,price:String,stock:Number,category:ObjectId,description:String}
 * @returns {Promise<void>}
 */
async function addItem(product) {
    //商品重复
    let result = await findByName(product.name);
    if (result) throw new Error(`${product.name}商品名已存在`)
    //分类查询
    result = await categoryService.findById(product.category);
    if (result == null) throw new Error(`${product.category}商品分类不存在`)
    result = await Product.create(product);
    return result
}

/**
 * 删除商品
 * delete http://localhost/product/delete/{id}
 * @param id
 * @returns {Promise<void>}
 */
async function deleteById(id) {
    //商品查询
    let result = await findById(id);
    if (!result) throw new Error(`ID:${id}商品名不存在`)
    result = await Product.deleteOne({_id: id});
    if (result.n != 1) throw new Error("删除失败")
}


/**
 * 更新商品
 * delete http://localhost/product/update/{id}
 * @param id
 * @param product
 * @returns {Promise<void>}
 */
async function updateById(id, product) {
    //商品查询
    let result = await findById(id);
    if (!result) throw new Error(`ID:${id}商品名不存在`)
    result = await Product.updateOne({_id: id}, product);
    if (result.n != 1) throw new Error("更新失败")
}

/**
 * 分页查询
 * delete http://localhost/product/query/{page}
 * @param page
 * @returns {Promise<*>}
 */
async function findByPage(page = 1) {
    let offset = (page - 1) * config.pageSize
    return await Product.find().skip(offset).limit(config.pageSize);
}

/**
 * 查询商品
 * @param name
 * @returns {Promise<*>}
 */
async function findByName(name) {
    return await Product.findOne({name: name});
}

/**
 * 查询商品
 * @param id
 * @returns {Promise<*>}
 */
async function findById(id) {
    return await Product.findOne({_id: id});
}

module.exports = {addItem, deleteById, findByPage, updateById}