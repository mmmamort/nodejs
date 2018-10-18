let Category = require("../model/category");

//添加商品
async function addItem(category) {
    //商品重复
    let result = await findByName(category.name);
    if (result) throw new Error(`${category.name}商品名已存在`)
    return await Category.create(category);
}

async function deleteById(id) {
    //商品查询
    let result = await findById(id);
    if (!result) throw new Error(`${id}商品ID不存在`)
    return await Category.deleteOne({_id: id});
}

async function updateById(id, category) {
    //商品查询
    let result = await findById(id);
    if (!result) throw new Error(`${id}商品ID不存在`)
    return await Category.updateOne({_id: id}, category);
}

async function findByPage(page = 1) {
    let pageSize = 2;
    let offset = (page - 1) * pageSize;
    return await Category.find().skip(offset).limit(pageSize)
}

async function findByName(name) {
    return await Category.findOne({name: name});
}

async function findById(id) {
    return await Category.findOne({_id: id});
}

module.exports = {addItem, deleteById, updateById, findByPage}