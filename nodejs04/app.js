require("./db")
const express = require("express");
//添加日志打印包
const morgan = require("morgan");
//导入配置文件
const config = require("./config");
//导入路由
const userRouter = require("./router/userRouter");

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

app.use("/", userRouter)

//端口号
app.listen(config.PORT)