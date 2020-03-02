//验证中间件
module.exports = () => {
    const check = (params, res) => {
        if (!params) {
            res.status(401).send({
                message: "请先登录"
            })
        }
    }

    return async (req, res, next) => {
        const jwt = require('jsonwebtoken')
        //引入Admin模型
        const Admin = require('../models/AdminUser')

        //获取token
        let token = ''
        console.log(req.headers);

        if (req.headers.authorization) {
            token = String(req.headers.authorization || " ").split(' ').pop()
        }
        //没有token告知用户先登录
        // assert(token, 401, "用户不存在，请先登录")
        console.log(token);

        check(token, res)
        //通过从前端获取的token解密出是哪个id生成的


        const { id } = jwt.verify(token, req.app.get('secret'))

        check(id, res)
        //查询出这个user挂载到req中
        req.user = await Admin.findById(id)
        // assert(req.user, 401, "用户不存在，请先登录")
        check(req.user, res)

        next()
    }

}
