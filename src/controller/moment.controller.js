const service = require('../service/moment.service')

class MomentController {
    //
    async create(ctx,next){
        //获取用户请求传递的参数
        const {name,id:userId} = ctx.user
        const content = ctx.request.body.content//加了那个中间件后，那么body里存的就是一个objcet

        // //查询数据 放到service文件里
        const result = await service.create(userId,content)
        //返回数据
        ctx.body = result

    }
    async detail(ctx,next){
        //获取用户请求传递的参数
        const momentId = ctx.params.momentId//加了那个中间件后，那么body里存的就是一个objcet

        // //查询数据 放到service文件里
        const result = await service.getMomentById(momentId)
        //返回数据
        ctx.body = result

    }
    async list(ctx,next){
        // //查询数据 放到service文件里
        const {offset,size} = ctx.query;
        const result = await service.getMomentList(offset,size)
        //返回数据
        ctx.body = result

    }
    async update(ctx,next){
        const { momentId} = ctx.params
        const { content} = ctx.request.body
        const result = await service.update(content,momentId)
        ctx.body = result
    }
    async remove(ctx,next){
        const { momentId} = ctx.params
        const result = await service.remove(momentId)
        ctx.body = result
    }
}

module.exports = new MomentController();