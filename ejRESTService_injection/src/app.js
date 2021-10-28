const express = require('express');
const app = express();

const routes = require('./frameworks/express/routes')

const PORT = process.env.PORT || 3000; 
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

const dependencies = require('./config/dependencies');

const ErrorHandler = require('./frameworks/express/ErrorHandler');
module.exports ={
    start: () =>{
        //Middlewares
        app.use(express.json());
        app.use(express.urlencoded({ extended:true } ));
        app.use(express.text())

        //Routes
        app.use(API_PREFIX, routes(dependencies));

        //Common Error Handler
        app.use(ErrorHandler);

        app.listen(PORT, () =>{
            console.log(`Web server is running in ${PORT}`);
        } )


    }   
} 
