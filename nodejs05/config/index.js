//获取环境变量
const nodeenv = process.env.ENV_CODE

let config = null

if (nodeenv === "production") {
    config = require("./prod")
} else {
    config = require("./dev")
}

module.exports = config