const Router = require('koa-router');

const authRouter = new Router({prefix:'/login'});

const {
    login
} = require('../controller/auth.controller.js')
const {
    verifyLogin
} = require('../middleWare/auth.middleWare')
authRouter.post('/',verifyLogin,login)

module.exports=authRouter