const config = require("../config");
let userService = require("../service/userService");
//加密模块
const encryptUtil = require("../utils/encryptUtil");

function checkUrl(url) {
    const ignoreUrls = [
        /\/user\/regist/,
        /\/user\/login/]

    let checkStatus = true

    for (let i = 0; i < ignoreUrls.length; i++) {
        let ignoreUrl = ignoreUrls[i];
        if (ignoreUrl.test(url)) {
            checkStatus = false
            break
        }
    }

    return checkStatus
}

module.exports = async (req, res, next) => {
    let url = req.url

    if (checkUrl(url)) {
        let token = req.get("token");
        if (!token) throw new Error("token不存在,请重新登录")
        //解密token
        let decryptedToken = ""
        try {
            decryptedToken = encryptUtil.aesDecrypt(token, config.TOKEN_KEY);
        } catch (e) {
            throw new Error("token解析异常,请重新登录")
        }
        //String转JSON{username: user.username, expire: Date.now() + config.TOKEN_EXPIRE}
        token = JSON.parse(decryptedToken);
        if (Date.now() > token.expire) throw new Error("token已过期,请重新登录")
        let user = await userService.isExistsByName(token.username);
        if (!user) throw new Error("token无效,请重新登录")

        //将user结果存储到req中
        req.user = user
    }

    next();
}