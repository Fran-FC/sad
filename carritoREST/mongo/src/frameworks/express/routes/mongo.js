const express = require('express');

const{
    mongoControllers
} = require('../../../controllers');

module.exports = dependencies =>{
    const router = express.Router();
    const{ addProductController, removeProductController, toStringController} = mongoControllers(dependencies);

    router.route( '/addProduct').put(addProductController);
    router.route( '/removeProduct').put(removeProductController);
    router.route('/toString/:owner').get(toStringController);


    return router;
} 