const User = require("../model/user");
const config = require("../config");

//机密模块
let encryptUtil = require("../utils/encryptUtil");

/**
 * 添加用户
 * @param user
 * @returns {Promise<*>}
 */
async function regist(user) {
    //空值检查
    checkNull(user.username, user.password)
    //用户名重复检查
    let result = await isExistsByName(user.username)
    if (result) throw new Error(`${user.username}用户名已存在`)
    //密码加密{参1:原文,参2:盐}
    user.password = encryptUtil.sha256Hmac(user.password, user.username);
    //权限赋值
    user.role = 0
    result = await User.create(user);
    //显示密码清空
    result.password = ""
    return result
}

/**
 * 用户登录
 * @param user
 * @returns {Promise<*>}
 */
async function login(user) {
    //空值检查
    checkNull(user.username, user.password)
    //用户存在检查
    let result = await isExistsByName(user.username);
    if (!result) throw new Error(`${user.username}用户名不存在`)
    //密码加密{参1:原文,参2:盐}
    user.password = encryptUtil.sha256Hmac(user.password, user.username);
    result = await User.findOne({username: user.username, password: user.password});
    if (!result) throw new Error(`${user.username}密码错误`)
    //显示密码清空
    result.password = ""
    return result
}

/**
 * 查找用户
 * @returns {Promise<*>}
 */
async function findAll() {
    let result = await User.find();
    result.forEach(user => {
        //显示密码清空
        user.password = ""
    });
    return result
}

/**
 * 删除用户
 * @param id
 * @returns {Promise<void>}
 */
async function deleteOne(id) {
    await isExistsById(id)
    await User.deleteOne({_id: id});
}

/**
 * 修改用户
 * @param id
 * @param user
 * @returns {Promise<void>}
 */
async function updateOne(id, user) {
    //空值检查
    checkNull(user.username, user.password)
    await isExistsById(id)
    //密码加密{参1:原文,参2:盐}
    user.password = encryptUtil.sha256Hmac(user.password, user.username);
    await User.updateOne({_id: id}, user);
}

/**
 * 用户存在检查
 * @param id
 * @returns {Promise<void>}
 */
async function isExistsById(id) {
    let result = await User.findOne({_id: id});
    if (!result) throw new Error(`用户ID:${id},不存在`);
}

/**
 * 用户存在检查
 * @param username
 * @returns {Promise<*>}
 */
async function isExistsByName(username) {
    let result = await User.findOne({username: username});
    return result
}

/**
 * 用户名密码非空检查
 * @param username
 * @param password
 */
function checkNull(username, password) {
    if (username == null || username.trim().length == 0 || password == null || password.trim().length == 0) throw  new Error("用户名密码为空")
}

/**
 * Token生成
 * @param user
 */
function createToken(user) {
    let token = {username: user.username, expire: Date.now() + config.TOKEN_EXPIRE}
    let result = encryptUtil.aesEncrypt(JSON.stringify(token), config.TOKEN_KEY);
    return result
}

module.exports = {regist, login, findAll, deleteOne, updateOne, createToken}