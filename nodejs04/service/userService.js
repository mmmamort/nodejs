/*username: {
        type: String,
        required: [true, "用户名不能缺少"]
    },
    password: {
        type: String,
        required: [true, "密码不能缺少"]
    },
    age: {
        type: Number,
        min: [0, "年龄不能小于0"],
        max: [120, "年龄不能大于120"]
    },
    role: {
        type: Number,
        default: 0 // 0是商家， 10086是管理员
    },
    created: {
        type: Date,
        default: Date.now()
    }*/

const User = require("../model/user");
//机密模块
let encryptUtil = require("../utils/encryptUtil");

/**
 * 添加用户
 * @param user
 * @returns {Promise<*>}
 */
async function regist(user) {
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


async function login(user) {
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
    await isExistsById(id)
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
 * @returns {Promise<void>}
 */
async function isExistsByName(username) {
    let result = await User.findOne({username: username});
    return result
}

module.exports = {regist, login, findAll, deleteOne, updateOne}