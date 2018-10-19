let mongoose = require("mongoose");
let config = require("./config");
mongoose.connect(`mongodb://localhost/${config.db}`, {useNewUrlParser: true});
let db = mongoose.connection;
db.on("error", err => {
    console.log(err.toString())
})
db.once("open", () => {
    console.log("连接成功")
})