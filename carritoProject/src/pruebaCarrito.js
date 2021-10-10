const http = require('http');
const fs = require("fs").promises;
const { Carrito } = require("./carrito");

// crea un objeto para acceder al carrito
// se debe de inicializar después
carro = new Carrito("Fran");

async function run(carro){
    await carro.cogerCarrito();
    carro.toString().then(console.log);
    //console.log(carroStr);
    await carro.add("manzanas", 2);
    await carro.add("manzanas", 3);
    try{
        await carro.remove("manzanas", 3);
        await carro.remove("platanos", 3); // salta excepcion
    } catch (err) {
        console.error(err.stack);
    }
    await carro.add("cereza", 2);

    carro.toString().then(console.log);
}
run(carro);