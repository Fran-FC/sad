// define service  
const axios = require("axios");
const { response } = require("express");

const SericeRegistryURL = "http://localhost:3000";
let MongoService = {
    name : "MongoClientAPI",
    version : "v0",
    ip : "",
    port : "",
    url : "http://"+this.ip+"/"+this.port+"/"+this.name+"/"+this.version+"/"
}
var MongoServiceURL = "";
// periodically find service 
setInterval(() => {
    axios
        .get(SericeRegistryURL+"/find/"+MongoService.name+"/"+MongoService.version)
        .then(response=>{
            MongoService.name = response.name;
            MongoService.version = response.version;
            MongoService.ip = response.ip;
            MongoService.port = response.port;
        })
        .catch(error=>{
            throw new Error("Error at requesting service to ServiceRegistry " + error)
        });
}, 10000);


module.exports= {
    get: async owner => {
        var carrito ;
        axios
            .get(MongoService.url+"carritos/"+owner)
            .then(response=>{
               carrito = response.carrito; 
            })
            .catch(error => {
                throw new Error("Fallo al pedir carro a MongoClientDB " + error)
            });
        return carrito;
    },
    add: async (owner, product, quantity)=> {
        var carrito ;
        axios
            .put(MongoService.url +"carritos/addProduct/"+owner+"/"+product+"/"+quantity)
            .then(response => {
                carrito = response.carrito;
            })
            .catch(error => {
                throw new Error("Error adding products... " + error)
            });
        return carrito;
    },
    remove: async (owner, product, quantity) => {
        var carrito ;
        axios
            .put(MongoService.url +"carritos/removeProduct/"+owner+"/"+product+"/"+quantity)
            .then(response => {
                carrito = response.carrito;
            })
            .catch(error => {
                throw new Error("Error removing products... " + error)
            });
        return carrito;

    }
} 



