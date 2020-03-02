module.exports = (app) => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    //验证中间件

    const authMiddleware = require('../../middleware/auth')

    const router = express.Router({
        mergeParams: true
    })


    // const Category = require('../../models/Category')
    // 新建
    router.post('/', async (req, res) => {
        // const Model = require(`../../models/${req.params.resource}`)
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //查询列表
    router.get('/', async (req, res) => {

        // await Category.findByIdAndRemove()
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)

        res.send(items)
    })
    //编辑单条分类查询
    router.get('/:id', async (req, res) => {
        console.log(req.Medal);

        const items = await req.Model.findById(req.params.id)
        res.send(items)
    })
    //修改
    router.put('/:id', async (req, res) => {
        const items = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(items)
    })
    // 删除
    router.delete('/:id', async (req, res) => {
        const items = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({ success: true })
    })
    app.use('/admin/api/rest/:resource', authMiddleware(), async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)

    // 上传
    //文件上传中间件multer
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 登录
    app.post('/admin/api/Login', async (req, res) => {
        const { username, password } = req.body
        const Admin = require('../../models/AdminUser')
        const user = await Admin.findOne({ username }).select('+password')

        //1.查询不到用户
        if (!user) {
            res.status(401).send({
                message: "用户不存在，请先登录"
            })
        }

        //2.校验密码
        //用用户传进来的password和数据库中查到的用户password值进行对比 
        let isValid = require('bcryptjs').compareSync(password, user.password)

        //密码错误
        if (!isValid) {
            res.status(422).send({
                message: "密码错误"
            })
        }

        //3.返回token
        //生成token
        const token = jwt.sign({
            id: user._id
        }, app.get('secret'))

        res.send({
            code: 1,
            token
        })

    })

}