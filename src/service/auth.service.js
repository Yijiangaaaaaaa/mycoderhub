const connection = require('../app/database')
class AuthService{
    async checkResource(tableName,id,userId){
        console.log(tableName,id,userId);
        const statement = `
        select * from ${tableName} where id=? AND user_id=?; 
        `
        const [result] = await connection.execute(statement,[id,userId]); //可以自动添加createAT,UPDATEat
        if(result.length>0)return true
        else return false
    }

}
module.exports = new AuthService