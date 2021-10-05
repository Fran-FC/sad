const http = require('http');
const fs = require("fs").promises;
const { Carrito } = require("./carrito");

// crea un objeto para acceder al carrito
// se debe de inicializar después
carro = new Carrito("Fran");

async function run(carro){
    await carro.cogerCarrito();
    let carroStr = await carro.toString();
    console.log(carroStr);
    await carro.add("manzanas", 2);
    await carro.add("manzanas", 3);
    try{
        await carro.remove("manzanas", 3);
        await carro.remove("platanos", 3); // salta excepcion
    } catch (err) {
        console.error(err.stack);
    }
    await carro.add("cereza", 2);

    console.log(await carro.toString());
}
run();


//create a server object:
//const requestListener = function (req, res) {
//    fs.readFile(__dirname + "/index.html")
//        .then(contents => {
//            res.writeHead(200, {'Content-Type': 'text/html'});
//            res.end(contents)
//        })
//        .catch(err=>{
//            res.writeHead(500);
//            res.end();
//            return;
//        });
//}
//
//const server = http.createServer(requestListener);
//server.listen(8080);

//listen(8080); //the server object listens on port 8080
