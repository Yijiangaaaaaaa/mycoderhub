const Router = require('koa-router')//第三方库
const { create } = require('../controller/user.controller')
const {verifyUser,handlePassword} = require('../middleWare/user.middleWare')
//1.创建路由
const userRouter = new Router({prefix:'/users'})

userRouter.post('/',verifyUser,handlePassword,create)

module.exports = userRouter