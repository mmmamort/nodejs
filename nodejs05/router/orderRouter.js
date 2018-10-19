const orderService = require("../service/orderService");
const router = require("express").Router();

/**
 * 添加订单
 * post http://localhost/order/add
 * @returns {Promise<void>}
 */
router.post("/add", async (req, res) => {
    let result = await orderService.addItem(req.body);
    res.succeed(result)
})

/**
 * 分页查询
 * get http://localhost/order/query/{page}
 * @param page
 * @returns {Promise<*>}
 */
router.get("/query(/:page)?", async (req, res) => {
    let result = await orderService.findByPage(req.params.page);
    res.succeed(result)
})

module.exports = router