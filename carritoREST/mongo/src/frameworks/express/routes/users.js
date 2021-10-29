const express = require('express');

const{
    userControllers
} = require('../../../controllers/');

module.exports = dependencies =>{
    const router = express.Router();
    const{ addUserController, listUsersController} = userControllers(dependencies);

    router.route( '/').post(addUserController);
    router.route('/').get(listUsersController);

    return router;
} 