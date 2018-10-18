let userService = require("../service/userService");
let router = require("express").Router();
let config = require("../config");
let encryptUtil = require("../utils/encryptUtil");
/**
 * 添加用户
 * url:http://localhost/regist
 * @param user
 * @returns {Promise<*>}
 */
router.post("/regist", async (req, res) => {
    let result = await userService.regist(req.body);
    res.succeed(result)
});

/**
 * 删除用户
 * url:http://localhost/delete/{id}
 * @param id
 * @returns {Promise<void>}
 */
router.delete("/delete/:id", async (req, res) => {
    await userService.deleteOne(req.params.id);
    res.succeed()
});

/**
 * 查找用户
 * url:http://localhost/findAll
 * @returns {Promise<*>}
 */
router.get("/findAll", async (req, res) => {
    let result = await userService.findAll();
    res.succeed(result)
});

/**
 * 修改用户
 * url:http://localhost/update/{id}
 * @param id
 * @param user
 * @returns {Promise<void>}
 */
router.put("/update/:id", async (req, res) => {
    await userService.updateOne(req.params.id, req.body);
    res.succeed()
});

/**
 * 用户登录
 * url:http://localhost/login
 * @param user
 * @returns {Promise<*>}
 */
router.post("/login", async (req, res) => {
    let user = await userService.login(req.body);
    let token = {username: user.username, expire: Date.now() + config.TOKEN_EXPIRE}
    let result = encryptUtil.aesEncrypt(JSON.stringify(token), config.TOKEN_KEY);
    res.succeed(result)
})

module.exports = router