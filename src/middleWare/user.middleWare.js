const errorTypes = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')

const verifyUser = async (ctx,next)=>{
    //获取用户名和密码
    const { name , password }  = ctx.request.body;

    //判断用户密码是不是空
    if(!name ||!password){
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error',error,ctx);
    }
    //判断用户名是不是存在了
    const result = await service.getUserByName(name);
    if(result.length){
        const error = new Error(errorTypes.USER_ALREADY_EXISITS)
        return ctx.app.emit('error',error,ctx)
    }

    await next();//必须要加await，因为下一个中间件可能会有异步操作，比如setTimeOut如果不加await，那么他会直接返回过来，这样会出错
}

const handlePassword = async (ctx,next)=>{
    const {password} = ctx.request.body
    ctx.request.body.password = md5password(password)
    await next();
}
module.exports={
    verifyUser,
    handlePassword
}