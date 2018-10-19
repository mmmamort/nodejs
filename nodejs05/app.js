require("./db")
require('express-async-errors');
const express = require("express");
//导入配置
const config = require("./config");
//添加日志打印包
const morgan = require("morgan");
//导入router
const categoryRouter = require("./router/categoryRouter"),
    productRouter = require("./router/productRouter"),
    orderRouter = require("./router/orderRouter"),
    userRouter = require("./router/userRouter");

//创立连接
const app = express();

//调用打印日志功能
app.use(morgan("combined"))

//json格式转换
app.use(express.json())

//导入中间件
app.use(require("./middleware/response_md"))
app.use(require("./middleware/token_md"))

app.use("/user", userRouter)
app.use("/category", categoryRouter)
app.use("/product", productRouter)
app.use("/order", orderRouter)

app.use((err, req, res, next) => {
    if (err) res.fail(err)
});

app.listen(config.PORT)