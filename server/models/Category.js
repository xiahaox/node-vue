//利用mongoose操作mongoDB数据库

const mongoose = require('mongoose')
//1.定义表结构
var userModel = new mongoose.Schema({
    // id: Number,
    name: String,
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
    // sex: String
})

//2.将表的数据结构与表关联起来  并 导出

module.exports = mongoose.model('Category', userModel)