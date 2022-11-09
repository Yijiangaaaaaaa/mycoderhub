//const service = require('../service/auth.service')
const jwt = require('jsonwebtoken')
const config = require('../app/config')

class AuthController {
    //
    async login(ctx,next){
        console.log(ctx.user);
        //颁发token
        const {id,name} = ctx.user;
        const token = jwt.sign({id,name},config.PRIVATE_KEY,{
            expiresIn:60*60*24,
            algorithm:'RS256'
        });
        // ctx.cookies.set("name2","liuyijiang",{
        //     maxAge:60*1000
        // })//设置一个cookie
        ctx.body={id,name,token}

    }
    async success(ctx,next){
        ctx.body="授权成功~"
    }
}

module.exports = new AuthController();