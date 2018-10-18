require("../db");
let categoryService = require("../service/categoryService");

async function test() {
    // let result = await categoryService.addItem({name: "1231231"});
    // let result = await categoryService.deleteById("5bc855d826797615c86c128b")
    // let result = await  categoryService.findByPage(2)
    let result = await  categoryService.updateById("5bc8560b0e98aa1124572159", {name: "五金工具"})
    console.log(result)
}

test()