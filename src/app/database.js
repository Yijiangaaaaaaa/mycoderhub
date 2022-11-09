const mysql = require('mysql2')
const config = require('./config.js')//前端所有的相对路径,都是相对于process.pwd来说的,如果我们的项目是在外边执行的
//比如 nodemon ./MYCODERHUB/src/index.js 这样执行就会报错了,因为此时的process.pwd是mycoderhub

const connections = mysql.createPool({
    host:config.MYSQL_HOST,
    port:config.MYSQL_PORT,
    database:config.MYSQL_DATABASE,
    user:config.MYSQL_USER,
    password:config.MYSQL_PASSWORD
})

connections.getConnection((err,conn)=>{ //测试连接用的
    conn.connect((err)=>{
        if(err){
            console.log("连接失败：",err);
        }else{
            console.log("数据库连接成功");
        }
    })
})
module.exports = connections.promise();