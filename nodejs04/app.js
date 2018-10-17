require("./db")
const express = require("express");
//添加日志打印包
const morgan = require("morgan");

//创立连接
const app = express();

//调用打印日志功能
app.use(morgan("combined"))

//端口号
app.listen(80)