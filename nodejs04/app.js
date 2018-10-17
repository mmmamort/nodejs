require("./db")
const express = require("express");
//添加日志打印包
const morgan = require("morgan");
//导入配置文件
const config = require("./config");

//创立连接
const app = express();

//调用打印日志功能
app.use(morgan("combined"))

//端口号
app.listen(config.PORT)