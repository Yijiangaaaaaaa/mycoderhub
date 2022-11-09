const app  = require('./app');
require('./app/database')//让database.js加载一下
const config = require('./app/config.js')

app.listen(config.APP_PORT,()=>{
    console.log(`服务器在${config.APP_PORT}启动成功~`);
})
