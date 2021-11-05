const express = require('express');
const axios = require('axios');

const app = express();

const routes = require('./frameworks/express/routes')

const PORT = process.env.PORT || 3001; 
const API_PREFIX = process.env.API_PREFIX || '/CarritoAPI/v0';

const dependencies = require('./config/dependencies');

const ErrorHandler = require('./frameworks/express/ErrorHandler');

const ServiceRegistryURL = "http://localhost:3000"

const updateToServiceRegistry = ()=>{
    // update 
    axios.
        put(ServiceRegistryURL + "/register" + API_PREFIX + "/" + PORT). // register into ServiceRegistry with api name, version and port
        then(response=>{
            //console.log("updated service in ServiceRegistry-> " + response);
        })
        .catch(error=>{
            console.error("ERROR updating in ServiceRegistry-> " + error);
        });
    setInterval(()=>{
        axios.
            put(ServiceRegistryURL + "/register" + API_PREFIX + "/" + PORT). // register into ServiceRegistry with api name, version and port
            then(response=>{
                //console.log("updated service in ServiceRegistry-> " + response);
            })
            .catch(error=>{
                console.error("ERROR updating in ServiceRegistry-> " + error);
            });
    }, 20000);
}
module.exports ={
    start: () =>{
        updateToServiceRegistry();
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
