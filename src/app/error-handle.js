const errorTypes = require('../constants/error-types')

const errorHandler = (error,ctx)=>{
    let status,message;

    switch (error.message){
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400 //bad request
            message = '用户名或者密码不能为空~'
            break;
        case errorTypes.USER_ALREADY_EXISITS:
            status = 409 //conflict
            message = '用户名已经存在~'
            break;
        case errorTypes.USER_DOES_NOT_EXISITS:
            status = 400 //参数错误
            message = '该用户不存在~'
            break;
        case errorTypes.PASSWORD_IS_INCORRENT:
            status = 400 
            message = '密码错误~'
            break;
        case errorTypes.UNAUTHORIZATION:
            status = 401 
            message = '无效token~'
            break;
        case errorTypes.UNPERMISSION:
            status = 401 
            message = '没有权限~'
            break;
        default:
            status = 404
            message = "NOT FOUND"
    }

    ctx.status = status;
    ctx.body = message;
}
module.exports=errorHandler