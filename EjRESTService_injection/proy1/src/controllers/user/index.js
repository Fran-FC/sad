const addUserController = require('./addUserController');

module.exports = dependencies =>{
    return{
        addUserController: addUserController(dependencies)
    } 
} 