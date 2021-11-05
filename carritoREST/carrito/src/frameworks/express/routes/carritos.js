const express = require('express');

const{
    carritoControllers
} = require('../../../controllers/');

module.exports = dependencies =>{
    const router = express.Router();
    const{ addProductController, removeProductController, toStringController} = carritoControllers(dependencies);

    router.route( '/addProduct').post(addProductController);
    router.route('/removeProduct').post(removeProductController);
    router.route('/toString').get(toStringController);

    return router;
} 