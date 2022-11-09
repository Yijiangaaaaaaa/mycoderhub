const connection = require('../app/database')

class MomentService{
    async create(userId,content){
        const statement = 'INSERT INTO moment (content,user_id) VALUES (?,?);'
        const [result] = await connection.execute(statement,[content,userId]); //可以自动添加createAT,UPDATEat
        return result
    }
    async getMomentById(id){
        const statement = `
        select 
            m.id id,m.content content, m.createAt createTime,m.updateAt updateTime,
            JSON_OBJECT('id',u.id,'name',u.name) user	
        from moment m
        LEFT JOIN user u on m.user_id = u.id
        where m.id = ?; 
        `
        const [result] = await connection.execute(statement,[id]); //可以自动添加createAT,UPDATEat
        return result[0]
    }
    async getMomentList(offset,size){
        const statement = `
        select 
            m.id id,m.content content, m.createAt createTime,m.updateAt updateTime,
            JSON_OBJECT('id',u.id,'name',u.name) user	
        from moment m
        LEFT JOIN user u on m.user_id = u.id
        limit ?,?; 
        `
        const [result] = await connection.execute(statement,[offset,size]); //可以自动添加createAT,UPDATEat
        return result
    }
    async update(content,momentId){
        const statement = `
        update moment set content = ? where id = ?
        `
        const [result] = await connection.execute(statement,[content,momentId]); //可以自动添加createAT,UPDATEat
        return result
    }
    async remove(momentId){
        try {
            const statement = `
            delete from moment where id = ?
            `
            const [result] =await connection.execute(statement,[momentId]); //可以自动添加createAT,UPDATEat
            return result
        } catch (error) {
            console.log(error);
        }
        
    }
}
module.exports=new MomentService;