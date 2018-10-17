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

//添加用户
//TODO 未做用户密码加密
async function add(user) {
    //用户名重复检查
    let result = await User.findOne({username: user.username});
    if (result) throw new Error("用户已存在")
    result = await User.create(user);
    return result

}

//查找用户
async function findAll() {
    let result = await User.find();
    return result
}

//删除用户
async function deleteOne(id) {
    await isExists(id)
    await User.deleteOne({_id: id});
}

//修改用户
async function updateOne(id, user) {
    await isExists(id)
    await User.updateOne({_id: id}, user);
}

//用户存在检查
async function isExists(id) {
    let result = await User.findOne({_id: id});
    if (!result) throw new Error(`用户ID:${id},不存在`);
}

//删除用户

module.exports = {add, findAll, deleteOne, updateOne}