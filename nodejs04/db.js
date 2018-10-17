const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true});

const db = mongoose.connection

db.on('error', err => console.log(err.toString()));

db.once('open', () => {
    console.log("连接成功")
});