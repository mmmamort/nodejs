let Category = require("../model/category");

/**
 * 添加分类
 * post http://localhost/category/add/{id}
 * @param category
 * @returns {Promise<void>}
 */
async function addItem(category) {
    //商品重复
    let result = await findByName(category.name);
    if (result) throw new Error(`${category.name}商品类别已存在`)
    return await Category.create(category);
}

/**
 * 删除分类
 * delete http://localhost/category/delete/{id}
 * @param id
 * @returns {Promise<void>}
 */
async function deleteById(id) {
    //商品查询
    let result = await findById(id);
    if (!result) throw new Error(`ID:${id}商品类别不存在`)
    result = await Category.deleteOne({_id: id});
    if (result.n !== 1) throw new Error("删除失败")
}


/**
 * 更新分类
 * delete http://localhost/category/update/{id}
 * @param id
 * @param category
 * @returns {Promise<void>}
 */
async function updateById(id, category) {
    //商品查询
    let result = await findById(id);
    if (!result) throw new Error(`ID:${id}商品类别不存在`)
    result = await Category.updateOne({_id: id}, category);
    if (result.n !== 1) throw new Error("更新失败")
}

/**
 * 分页查询
 * delete http://localhost/category/query/{page}
 * @param page
 * @returns {Promise<*>}
 */
//todo pageSize可以抽取到config中
async function findByPage(page = 1) {
    let pageSize = 2;
    let offset = (page - 1) * pageSize;
    return await Category.find().skip(offset).limit(pageSize)
}

/**
 * 查询分类
 * @param name
 * @returns {Promise<*>}
 */
async function findByName(name) {
    return await Category.findOne({name: name});
}

/**
 * 查询分类
 * @param id
 * @returns {Promise<*>}
 */
async function findById(id) {
    return await Category.findOne({_id: id});
}

module.exports = {addItem, deleteById, updateById, findByPage}