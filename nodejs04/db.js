let mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true});

let db = mongoose.connection

db.on('error', err => console.log(err.toString()));

db.once('open', () => {
    console.log("连接成功")
});