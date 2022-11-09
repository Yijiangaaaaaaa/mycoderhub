const Router = require('koa-router')//第三方库
const { create,detail,list,update,remove,reply } = require('../controller/comment.controller')
const {verifyAuth,verifyPermission} = require('../middleWare/auth.middleWare')

//1.创建路由
const commentRouter = new Router({prefix:'/comment'})
commentRouter.post('/',verifyAuth,create)
commentRouter.post('/:commentId/reply',verifyAuth,reply)
commentRouter.patch('/:commentId',verifyAuth,verifyPermission('comment'),update)//1.授权2.验证登录的用户有权限去修改内容3.修改
commentRouter.delete('/:commentId',verifyAuth,verifyPermission('comment'),remove)//1.授权2.验证登录的用户有权限去修改内容3.修改
module.exports = commentRouter