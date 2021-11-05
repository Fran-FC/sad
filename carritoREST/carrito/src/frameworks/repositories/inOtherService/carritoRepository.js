// define service  
const axios = require("axios");
const { response } = require("express");

const SericeRegistryURL = "http://localhost:3000";
let MongoService = {
    name : "MongoClientAPI",
    version : "v0",
    ip : "",
    port : ""
   // url : "http://"+this.ip+"/"+this.port+"/"+this.name+"/"+this.version+"/"
}
let MongoURL = "";
// periodically find service 
setInterval(() => {
    axios
        .get(SericeRegistryURL+"/find/"+MongoService.name+"/"+MongoService.version)
        .then(response=>{
            console.log(response.data);
            MongoService.name = response.data.name;
            MongoService.version = response.data.version;
            MongoService.ip = response.data.ip;
            MongoService.port = response.data.port;
            
            MongoURL = "http://"+MongoService.ip+"/"+MongoService.port+"/"+MongoService.name+"/"+MongoService.version;
        })
        .catch(error=>{
            throw new Error("Error at requesting service to ServiceRegistry " + error)
        });
}, 10000);


module.exports= {
    get: async owner => {
        var carrito ;
        console.log(MongoURL+"mongo/toString/"+owner);
        axios
            .get(MongoURL+"mongo/toString/"+owner)
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
        carrito = {
            owner : owner,
            product : product,
            quantity : quantity
        }
        axios
            //.put(MongoURL +"carritos/addProduct"+owner+"/"+product+"/"+quantity)
            .put(MongoURL+"mongo/addProduct", carrito)
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
        carrito = {
            owner : owner,
            product : product,
            quantity : quantity
        }
        axios
            .put(MongoURL +"mongo/removeProduct", carrito)
            .then(response => {
                carrito = response.carrito;
            })
            .catch(error => {
                throw new Error("Error removing products... " + error)
            });
        return carrito;
    }
} 



