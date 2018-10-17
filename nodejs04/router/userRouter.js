//todo 未做空参检测，以及未检测error提示
let userService = require("../service/userService");
let router = require("express").Router();
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
router.post("/update/:id", async (req, res) => {
    let user = req.body
    await userService.updateOne(req.params.id, user);
    res.succeed()
});

module.exports = router