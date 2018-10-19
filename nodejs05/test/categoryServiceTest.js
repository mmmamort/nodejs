require("../db");
let categoryService = require("../service/categoryService");

async function test() {
    // let result = await categoryService.addItem({name: "1231231"});
    // let result = await categoryService.deleteById("5bc855d826797615c86c128b")
    // let result = await  categoryService.findByPage(2)
    let result = await  categoryService.updateById("5bc8560b0e98aa112457215a", {name: "五金工具"})
    // let result =await categoryService.findById("5bc8560b0e98aa112457215a");
    console.log(result)
}

test()