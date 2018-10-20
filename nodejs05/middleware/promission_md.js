const permissions = [
    {
        role: 0,// 普通商家用户
        urls: [
            /\/category.*/,
            /\/product.*/,
            /\/order.*/
        ]
    }, {
        role: 100,// 管理员
        urls: [
            /.*/
        ]
    }
];

module.exports = (req, res, next) => {
    let user = req.user;

    let isGo = false

    if (user) {
        outer:for (let i = 0; i < permissions.length; i++) {
            //获取权限对象
            let permission = permissions[i]
            //判断用户权限
            if (user.role === permission.role) {
                //取得用户权限能访问的地址
                let urls = permission.urls;
                //验证当前地址是否在权限内
                for (let j = 0; j < urls.length; j++) {
                    let url = urls[j];
                    if (url.test(req.url)) {
                        //赋予权限
                        isGo = true
                        break outer
                    }
                }
            }
        }
        if (!isGo) throw new Error("当前用户无访问权限")
    }

    next()
}