let router = require("express").Router();
let productService = require("../service/productService");

/**
 * 添加商品
 * post http://localhost/product/add
 * @param product{name:String,price:String,stock:Number,product:ObjectId,description:String}
 * @returns {Promise<void>}
 */
router.post("/add", async (req, res) => {
    let result = await productService.addItem(req.body);
    res.succeed(result)
})

/**
 * 删除商品
 * delete http://localhost/product/delete/{id}
 * @param id
 * @returns {Promise<void>}
 */
router.delete("/delete/:id", async (req, res) => {
    await productService.deleteById(req.params.id)
    res.succeed()
})

/**
 * 更新商品
 * delete http://localhost/product/update/{id}
 * @param id
 * @param product
 * @returns {Promise<void>}
 */
router.put("/update/:id", async (req, res) => {
    await productService.updateById(req.params.id, req.body)
    res.succeed()
})

/**
 * 分页查询
 * delete http://localhost/product/query/{page}
 * @param page
 * @returns {Promise<*>}
 */
router.get("/query(/:page)?", async (req, res) => {
    let result = await productService.findByPage(req.params.page);
    res.succeed(result)
})

module.exports = router