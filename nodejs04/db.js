const mongoose = require("mongoose");
//导入配置文件
const config = require("./config/dev");

mongoose.connect(`mongodb://localhost/${config.DB}`, {useNewUrlParser: true});

const db = mongoose.connection

db.on('error', err => console.log(err.toString()));

db.once('open', () => {
    console.log("连接成功")
});