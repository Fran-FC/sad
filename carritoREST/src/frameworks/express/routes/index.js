const express = require('express');
const userRoutes = require('./users')

module.exports = dependencies =>{
    const routes = express.Router();
    const users = userRoutes(dependencies);
    routes.use('/users',users)
    return routes;
}
