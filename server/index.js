const express = require('express');

const app = express();

//生成这个密钥生成token，一般这个存储在环境变量中，这里简便处理
app.set('secret', 'ssdasdad')
app.use(express.json())
app.use(require('cors')())
app.use('/uploads', express.static(__dirname + '/uploads')) //托管到虚拟的静态目录
app.use('/admin', express.static(__dirname + '/public/admin'))
app.use('/', express.static(__dirname + '/public/web'))

require('./routes/admin')(app)
require('./routes/web')(app)

require('./plugins/db')(app)
app.listen(3000, () => {
    console.log('正在监听端口3000,http://127.0.0.1:3000');
})