module.exports = (app) => {
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/Category')
    router.post('/categoies', async (req, res) => {
        // console.log(req, res);

        const model = await Category.create(req.body)
        // const model = await Category.remove()
        res.send(model)
    })
    app.use('/admin/api', router)
}