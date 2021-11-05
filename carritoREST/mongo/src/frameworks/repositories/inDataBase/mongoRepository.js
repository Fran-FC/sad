const {
    inDataBase
} = require('../../database');

const{
    v4 : uuidv4
}  = require('uuid');

module.exports= {
    add: async user =>{ 
        if (!user.id){
            user.id = uuidv4();

        } 
        inMemoryDb.users.push(user);
        console.log(inMemoryDb);
        return user;

    } ,
    delete: user =>{
        const index = inMemoryDb.users.findIndex(item => item.id === user.id);
        if (index>=0){
            inMemoryDb.users.splice(index,1);
            return user;
        } 
        return null;

    },
    get: owner =>{
        const index = inMemoryDb.users.findIndex(item => item.id === user.id);
        if (index>=0){
            inMemoryDb.users[index] = user;
            return inMemoryDb.users[index];
        } 
        return null;
    },
    getById: id =>{
        return inMemoryDb.users.find(item => item.id === id);
    },
    list: ()=>{
        return inMemoryDb.users
    }


} 



