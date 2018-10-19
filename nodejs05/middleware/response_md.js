module.exports = (req, res, next) => {
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