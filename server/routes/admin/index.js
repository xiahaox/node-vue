module.exports = (app) => {
    const express = require('express')
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
        // console.log(items);

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
    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        console.log(modelName);

        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)

    // 上传
    //文件上传中间件multer
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}