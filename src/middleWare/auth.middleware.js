const jwt = require('jsonwebtoken')

const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const md5password = require('../utils/password-handle')
const config = require('../app/config')

const verifyLogin = async (ctx,next)=>{
    //1.获取用户名和密码
    const { name , password }  = ctx.request.body;

    //2.判断用户名和密码是否空
    if(!name ||!password){
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error',error,ctx);
    }
    //3.判断用户是否存在
    const result = await userService.getUserByName(name);
    const user =result[0]
    if(!user){
        const error = new Error(errorTypes.USER_DOES_NOT_EXISITS)
        return ctx.app.emit('error',error,ctx)
    }
    //4.判断密码是否和数据库的密码是否一致
    if(md5password(password)!==user.password){
        const error = new Error(errorTypes.PASSWORD_IS_INCORRENT)
        return ctx.app.emit('error',error,ctx)
    }
    //5.将user传递下去
    ctx.user=user

    await next();//必须要加await，因为下一个中间件可能会有异步操作，比如setTimeOut如果不加await，那么他会直接返回过来，这样会出错
}

const verifyAuth = async (ctx,next)=>{
    //1.获取token
    console.log("auth的middleware~");
    try {
        const authorization = ctx.headers.authorization;
        const token = authorization.replace("Bearer ","")
        const result = jwt.verify(token,config.PUBLIC_KEY,{
            algorithms:["RS256"]
        });
        ctx.user = result;//id，name，exp
        await next();//必须要加await，因为下一个中间件可能会有异步操作，比如setTimeOut如果不加await，那么他会直接返回过来，这样会出错
    } catch (e) {
       const error = new Error(errorTypes.UNAUTHORIZATION);
       ctx.app.emit('error',error,ctx)
    }
}

const verifyPermission = (tableName) =>{
    return async (ctx,next)=>{
        console.log("验证权限的middleware~");
        //1.获取参数
        const id = ctx.user.id
        try {//为什么这里加trycatch呢,因为:这里不捕获异常的话,这个方法是由next调用过来的,就会传到第一层调用的地方去,第一层是verufyAuth,会报不是有效token~
            const isPermission  = await authService.checkResource(tableName,ctx.params[Object.keys(ctx.params)[0]],id)
            if(!isPermission){
                throw new Error()
            }
            await next();  
        } catch (err) {
            const error = new Error(errorTypes.UNPERMISSION);
            return ctx.app.emit('error',error,ctx)
        }
        
    }
}


module.exports={
    verifyLogin,
    verifyAuth,
    verifyPermission
}