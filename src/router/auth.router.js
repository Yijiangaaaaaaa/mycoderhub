const Router = require('koa-router');

const authRouter = new Router({prefix:'/login'});

const {
    login
} = require('../controller/auth.controller.js')

authRouter.post('/login',login)

module.exports=authRouter