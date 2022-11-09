const dotenv = require('dotenv');
const fs =require('fs')
const path = require('path')

dotenv.config()
const PRIVATE_KEY=fs.readFileSync('src/app/keys/private.key');//写相对路径一定要看从哪里启动的，打开package。json看看start确定是从哪里启动的
const  PUBLIC_KEY=fs.readFileSync(path.resolve(__dirname,'./keys/public.key'))//或者这么写

module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD
} = process.env

module.exports.PRIVATE_KEY=PRIVATE_KEY
module.exports.PUBLIC_KEY=PUBLIC_KEY