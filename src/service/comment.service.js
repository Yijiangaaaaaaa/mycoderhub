const connection = require('../app/database')

class CommentService{
    async create(momentId,content,userId){
        console.log(momentId,content,userId);
        const statement = 'INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?);'
        const [result] = await connection.execute(statement,[content,momentId,userId]); //可以自动添加createAT,UPDATEat
        return result
    } 
    async reply(momentId,content,userId,commentId){
        const statement = 'INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES (?,?,?,?);'
        const [result] = await connection.execute(statement,[content,momentId,userId,commentId]); //可以自动添加createAT,UPDATEat
        return result
    } 
    async update(content,commentId){
        const statement = `
        update comment set content = ? where id = ?
        `
        const [result] = await connection.execute(statement,[content,commentId]); //可以自动添加createAT,UPDATEat
        return result
    }
    async remove(commentId){
        try {
            const statement = `
            delete from comment where id = ?
            `
            const [result] =await connection.execute(statement,[commentId]); //可以自动添加createAT,UPDATEat
            return result
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports=new CommentService;