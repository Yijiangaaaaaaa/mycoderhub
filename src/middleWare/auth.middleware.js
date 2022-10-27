const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const md5password = require('../utils/password-handle')

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
    

    await next();//必须要加await，因为下一个中间件可能会有异步操作，比如setTimeOut如果不加await，那么他会直接返回过来，这样会出错
}



module.exports={
    verifyLogin,
}