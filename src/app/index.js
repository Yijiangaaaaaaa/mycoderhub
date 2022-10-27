const Koa  = require('koa');
const bodyparser = require('koa-bodyparser')

const userRouter  = require('../router/user.router');
const authRouter = require('../router/auth.router')
const errorhandler = require('./error-handle')
const app = new Koa();

//路径-中间件处理的映射

app.use(bodyparser())
//注册登录角色
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
//登录
app.use(authRouter.routes())
app.use(authRouter.allowedMethods())


app.on('error',errorhandler)
module.exports = app