require("../db")
let orderService = require("../service/orderService");

async function test() {
    // order{productId:ObjectId,productName:String,productPrice:String,count:Number,total:String}
    //5bc92778cafef30e7cd6e840
    let result = await orderService.addItem({
        productId: "5bc92778cafef30e7cd6e840",
        count: 4
    });


    console.log(result)
}

test()