let categoryService = require("../service/categoryService");
let router = require("express").Router();

/**
 * 添加分类
 * post http://localhost/category/add/{id}
 * @param category
 * @returns {Promise<void>}
 */
router.post("/add", async (req, res) => {
    let result = await categoryService.addItem(req.body);
    res.succeed(result)
})

/**
 * 删除分类
 * delete http://localhost/category/delete/{id}
 * @param id
 * @returns {Promise<void>}
 */
router.delete("/delete/:id", async (req, res) => {
    await categoryService.deleteById(req.params.id)
    res.succeed()
})

/**
 * 更新分类
 * put http://localhost/category/update/{id}
 * @param id
 * @param category
 * @returns {Promise<void>}
 */
router.put("/update/:id", async (req, res) => {
    await categoryService.updateById(req.params.id, req.body)
    res.succeed()
})

/**
 * 分页查询
 * get http://localhost/category/query/{page}
 * @param page
 * @returns {Promise<*>}
 */
router.get("/query(/:page)?", async (req, res) => {
    let result = await categoryService.findByPage(req.params.page);
    res.succeed(result)
})

module.exports = router