require("../db")
let productService = require("../service/productService");

async function test() {
    //5bc87e7aaa3c1433fc75537f
    // product{name:String,price:String,stock:Number,category:ObjectId,description:String}

    // let result = await productService.addItem(
    //     {
    //         name: "三星 Galaxy S9+（SM-G9650/DS）",
    //         price: "6499.00",
    //         stock: 999,
    //         category: "5bc87e7aaa3c1433fc75537f",
    //         description: "960帧/秒凝时拍摄！学生专享9折！"
    //     }
    // );

    // let result = await productService.findByPage()

    // let result = await productService.updateById("5bc93437fdb4e43ed88fbffc",
    //     {
    //         name: "三星 ",
    //         price: "6",
    //         stock: 999,
    //         category: "5bc87e7aaa3c1433fc75537f",
    //         description: "享9折！",
    //         isOnSale: false
    //     }
    // )


    let result = await productService.deleteById("5bc93437fdb4e43ed88fbffc");


    console.log(result)

}

test()