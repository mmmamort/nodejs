require("./db")
require('express-async-errors');
const express = require("express");
//添加日志打印包
const morgan = require("morgan");
//导入router
let categoryRouter = require("./router/categoryRouter");

//创立连接
const app = express();

//调用打印日志功能
app.use(morgan("combined"))

//json格式转换
app.use(express.json())

app.use((req, res, next) => {
        res.succeed = (result) => {
            res.send({
                code: 1,
                msg: "操作成功",
                data: result
            })
        }
        res.fail = (err) => {
            res.send({
                code: 1,
                msg: "操作失败",
                data: err.toString()
            })
        }
        next()
    }
)

app.use("/category", categoryRouter)

app.use((err, req, res, next) => {
    if (err) res.fail(err)
});

//todo 端口可以抽取到config中
app.listen(80)