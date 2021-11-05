const express = require('express');
const carritoRoutes = require('./carritos')

module.exports = dependencies =>{
    const routes = express.Router();
    const carritos = carritoRoutes(dependencies);
    routes.use('/carritos',carritos)
    return routes;
}
