const addUserController = require('./addUserController');
const listUsersController = require("./listUsersController");

module.exports = dependencies =>{
    return {
        addUserController: addUserController(dependencies),
        listUsersController: listUsersController(dependencies)
    } 
} 