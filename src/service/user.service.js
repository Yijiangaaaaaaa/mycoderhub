const connection = require('../app/database')

class UserService{
    async create(user){
        //将user存储到数据库中
        const statement = 'INSERT INTO user (name, password) VALUES (?, ?);'
        const result = await connection.execute(statement,[user.name,user.password]); //可以自动添加createAT,UPDATEat
        return result[0]
    }

    async getUserByName(name){
        //将user存储到数据库中
        const statement = 'select * from user where name = ? ;'
        const reslut = await connection.execute(statement,[name]); //可以自动添加createAT,UPDATEat
        return reslut[0]
    }
}
module.exports=new UserService;