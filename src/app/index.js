const Koa  = require('koa');
const bodyparser = require('koa-bodyparser')

const errorhandler = require('./error-handle')
const useRoutes = require('../router')
const app = new Koa();

//路径-中间件处理的映射

app.use(bodyparser())
//注册登录角色
useRoutes(app)

app.on('error',errorhandler)
module.exports = app