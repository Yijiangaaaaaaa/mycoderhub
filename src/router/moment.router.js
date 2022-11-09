const Router = require('koa-router')//第三方库
const { create,detail,list,update,remove } = require('../controller/moment.controller')
const {verifyAuth,verifyPermission} = require('../middleWare/auth.middleWare')

//1.创建路由
const momentRouter = new Router({prefix:'/moment'})
momentRouter.post('/',verifyAuth,create)//既验证了token，又把user存到ctx里了，后边的中间件都可以使用user
momentRouter.get('/:momentId',detail)//此时不需要加verifyAuth，因为查看动态不需要登录就可以查看
momentRouter.get('/',list)//此时不需要加verifyAuth，因为查看动态不需要登录就可以查看
momentRouter.patch('/:momentId',verifyAuth,verifyPermission('moment'),update)//1.授权2.验证登录的用户有权限去修改内容3.修改
momentRouter.delete('/:momentId',verifyAuth,verifyPermission('moment'),remove)//1.授权2.验证登录的用户有权限去修改内容3.修改
module.exports = momentRouter