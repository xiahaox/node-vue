const mongoose = require("mongoose")

module.exports = (app) => {
    // console.log(mongoose);

    mongoose.connect('mongodb://localhost:27017/node_vue')
    //得到数据库连接句柄
    var db = mongoose.connection;
    //通过数据库连接句柄，监听mongoose数据库成功的事件
    db.on('open', function (err) {
        if (err) {
            console.log('数据库连接失败');
            throw err;
        }
        console.log('数据库连接成功')
    })

}