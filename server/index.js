const express = require('express');

const app = express();
app.use(express.json())
app.use(require('cors')())
require('./routes/admin')(app)
require('./plugins/db')(app)
app.listen(3000, () => {
    console.log('正在监听端口3000,http://127.0.0.1:3000');
})