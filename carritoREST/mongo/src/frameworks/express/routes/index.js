const express = require('express');
const mongoRoutes = require('./mongo')

module.exports = dependencies =>{
    const routes = express.Router();
    const mongos = mongoRoutes(dependencies);
    routes.use('/mongo',mongos)
    return routes;
}
